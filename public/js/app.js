
        let socket = io('http://localhost:3000');
        
        function $(id) {
            return document.getElementById(id);
        }
        socket.on('hello', ()=>{
            let li = document.createElement('li');
            li.innerHTML='usuario conectado';
            $('div').appendChild(li);
        });
        socket.on('disconnected',(user) => {
            let li = document.createElement('li');
            li.innerHTML=`${user} se ha desconectado`;
            $('div').appendChild(li);
        });
        socket.on('chat message', function(msg){
            let li = document.createElement('li');
            li.innerHTML=`${msg.username} envio ${msg.msg}`;
            $('div').appendChild(li);
        });
        function send() { 
            socket.emit('chat message', {username:$('user').value.trim()===''? 'Anonimo' :$('user').value,
                                         msg:$('inp').value});
        }
        $('button').addEventListener('click',send);
        window.onunload = ()=>{
            socket.emit('disconnected',$('user').value.trim()===''? 'Anonimo' :$('user').value);
        }