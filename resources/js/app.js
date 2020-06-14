require('./bootstrap');

window.Vue = require('vue');

// Auto scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

// Notifications
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";
Vue.use(Toaster, { timeout: 5000 });

Vue.component('message-component', require('./components/MessageComponent.vue').default);


const app = new Vue({
    el: "#app",
    data: {
        message: "",
        typing: "",
        numberOfUsers: 0,
        chat: {
            messages: [],
            user: [],
            color: [],
            position: [],
            time: []
        }
    },
    watch: {
        message() {
            Echo.private("chat").whisper("typing", {
                name: this.message
            });
        }
    },
    methods: {
        send() {
            if (this.message.length != 0) {
                this.chat.messages.push(this.message);
                this.chat.user.push("you");
                this.chat.color.push("warning");
                this.chat.position.push("text-right");
                this.chat.time.push(this.getTime());
                axios
                    .post("/send", {
                        message: this.message,
                        chat: this.chat
                    })
                    .then(response => {
                        this.message = "";
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        getTime() {
            let time = new Date();
            return time.getHours() + ":" + time.getMinutes();
        },
        getOldMessages() {
            axios
                .post("/getOldMessage")
                .then(response => {
                    console.log(response);
                    if (response.data != "") {
                        this.chat = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteSession() {
            axios
                .post("/deleteSession")
                .then(response =>
                    this.$toaster.success("Chat history is deleted")
                );
        }
    },
    mounted() {
        this.getOldMessages()
        Echo.private("chat")
            .listen("ChatEvent", e => {
                this.chat.user.push(e.user);
                this.chat.messages.push(e.message);
                this.chat.color.push("secondary");
                this.chat.position.push("text-left");
                this.chat.time.push(this.getTime());
            })
            .listenForWhisper("typing", e => {
                if (e.name != "") {
                    this.typing = "typing...";
                } else {
                    this.typing = "";
                }
            });

        Echo.join(`chat`)
            .here(users => {
                this.numberOfUsers = users.length;
            })
            .joining(user => {
                this.numberOfUsers += 1;
                this.$toaster.success(user.name + " joined to chat");
            })
            .leaving(user => {
                this.numberOfUsers -= 1;
                this.$toaster.warning(user.name + " left chat");
            });
    }
});
