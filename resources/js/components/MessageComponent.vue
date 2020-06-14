<template>
    <div class="">
        <li class="list-group-item" :class="listClass"><slot></slot></li>
        <small class="badge float-right badge-success">{{ user }}</small>
        {{ time }}
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'user',
            'position',
            'time'
        ],
        computed:{
            listClass(){
                return 'list-group-item-'+this.color+' '+this.position
            }
        }
    }
   
</script>
