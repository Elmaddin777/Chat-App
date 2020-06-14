<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group{
            overflow-y: scroll;
            height: 400px;
            background-color: #fff;
        }
        .badge-w{
            width:20%;
        }
    </style>
</head>
<body class="mt-5">
    <div class="container">
        <div class="row " id="app"  style="display:flex; justify-content:center;">
            <div class="col-5">
                <li class="list-group-item active text-center">Welcome to edisChat!
                     <span class="badge badge-pill badge-danger ml-1">@{{ numberOfUsers }}</span></li>
                
                <ul class="list-group" v-chat-scroll>
                    <div class="badge badge-w badge-pill badge-primary mt-2 ml-2 mb-2 text-center">@{{ typing }}</div>
                    <message-component 
                        v-for="message,index in chat.messages" 
                        :color="chat.color[index]"
                        :user = "chat.user[index]"
                        :position="chat.position[index]"
                        :time = "chat.time[index]"
                        >
                        @{{ message }}
                    </message-component>
                    {{-- <li v-for="message in chat.messages" class="list-group-item">@{{ message }}</li> --}}
                </ul>
                <input type="text" v-model="message" v-on:keyup.enter="send" class="form-control" placeholder="Type your message here..." autofocus>
            </div>
        </div>  
    </div>


<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>