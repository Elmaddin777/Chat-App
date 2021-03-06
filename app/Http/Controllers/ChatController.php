<?php

namespace App\Http\Controllers;

use App\User;
use App\Events\ChatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function __construct(){
       $this->middleware('auth');
    }

    public function chat(){
        return view('chat');
    }

    public function send(Request $request){
        $user = User::find(Auth::id());
        $this->saveToSession($request);
        event(new ChatEvent($request->message, $user));
    }

    public function saveToSession($request){
        session()->put('chat_message', $request->message);
    }

    public function getOldMessage(){
        return session()->get('chat_message');
    }

    public function deleteSession(){
        session()->forget('chat');
    }
}
