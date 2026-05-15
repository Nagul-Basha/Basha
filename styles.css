*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

/* BODY */
body{
    background:linear-gradient(
        270deg,
        #4facfe,
        #00f2fe,
        #6a11cb,
        #ff0066
    );

    background-size:400% 400%;
    animation:bgMove 12s ease infinite;

    color:#111;
    min-height:100vh;
    overflow-x:hidden;
}

/* DARK MODE */
body.dark{
    background:#0f172a;
    color:white;
}

/* MENU BUTTON */
.menu-btn{
    position:fixed;
    top:15px;
    right:15px;

    width:50px;
    height:50px;

    display:flex;
    align-items:center;
    justify-content:center;

    font-size:25px;

    background:rgba(255,255,255,0.75);

    backdrop-filter:blur(12px);

    border-radius:18px;

    cursor:pointer;

    z-index:1000;

    transition:0.3s;
}

.menu-btn:hover{
    transform:scale(1.08);
}

/* SIDE MENU */
.side-menu{
    position:fixed;

    top:0;
    right:-320px;

    width:300px;
    height:100%;

    background:rgba(255,255,255,0.82);

    backdrop-filter:blur(16px);

    padding:20px;

    box-shadow:-5px 0 20px rgba(0,0,0,0.3);

    z-index:1001;

    transition:0.4s ease;

    overflow-y:auto;

    display:flex;
    flex-direction:column;
    gap:12px;
}

.side-menu.active{
    right:0;
}

body.dark .side-menu{
    background:rgba(20,20,30,0.9);
}

/* SIDE BUTTONS */
.side-menu button{
    width:100%;
    padding:12px;

    border:none;
    border-radius:18px;

    background:linear-gradient(
        90deg,
        #4facfe,
        #00f2fe
    );

    color:white;
    cursor:pointer;

    transition:0.3s;
}

.side-menu button:hover{
    transform:translateY(-2px);
}

/* OVERLAY */
.overlay{
    position:fixed;

    top:0;
    left:0;

    width:100%;
    height:100%;

    background:rgba(0,0,0,0.45);

    opacity:0;
    pointer-events:none;

    transition:0.3s;

    z-index:900;
}

.overlay.active{
    opacity:1;
    pointer-events:auto;
}

/* HISTORY */
.history-item{
    background:rgba(255,255,255,0.6);

    padding:10px;

    border-radius:12px;

    font-size:13px;

    line-height:1.5;
}

body.dark .history-item{
    background:rgba(255,255,255,0.1);
}

/* WELCOME */
.welcome{
    width:100%;
    height:100vh;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:20px;
}

.welcome-box{
    width:100%;
    max-width:420px;

    background:rgba(255,255,255,0.78);

    backdrop-filter:blur(18px);

    border-radius:24px;

    padding:35px 25px;

    text-align:center;

    display:flex;
    flex-direction:column;
    gap:16px;

    animation:fadeIn 0.7s ease;
}

body.dark .welcome-box{
    background:rgba(20,20,30,0.85);
}

/* TITLES */
h1,
h2{
    background:linear-gradient(
        90deg,
        #00f2fe,
        #4facfe
    );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}

/* START BUTTON */
.start-btn{
    padding:14px 20px;

    border:none;
    border-radius:22px;

    background:linear-gradient(
        90deg,
        #4facfe,
        #00f2fe
    );

    color:white;
    cursor:pointer;

    transition:0.3s;
}

.start-btn:hover{
    transform:scale(1.05);
}

/* MAIN APP */
.main-app{
    display:none;

    width:100%;
    min-height:100vh;

    align-items:center;
    justify-content:center;

    padding:20px;
}

/* CARD */
.card{
    width:100%;
    max-width:420px;

    background:rgba(255,255,255,0.78);

    backdrop-filter:blur(20px);

    border-radius:24px;

    padding:20px;

    animation:fadeIn 0.6s ease;

    position:relative;
}

body.dark .card{
    background:rgba(20,20,30,0.88);
}

/* MODE */
.mode{
    display:flex;
    align-items:center;
    justify-content:space-between;

    font-size:13px;
    color:gray;
}

/* CAMERA BUTTON */
.camera-btn{
    width:42px;
    height:42px;

    border:none;
    border-radius:50%;

    background:linear-gradient(
        90deg,
        #ff7eb3,
        #ff758c
    );

    color:white;

    font-size:18px;

    cursor:pointer;

    transition:0.3s;
}

.camera-btn:hover{
    transform:scale(1.08);
}

/* INPUT WRAPPER */
.input-wrapper{
    position:relative;
    width:100%;
}

/* TEXTAREAS */
.chat-input,
.chat-output{
    width:100%;

    min-height:55px;
    max-height:220px;

    padding:14px;
    padding-right:60px;

    border:none;
    border-radius:18px;

    resize:none;

    overflow-y:auto;
    outline:none;

    font-size:15px;

    background:rgba(255,255,255,0.65);

    backdrop-filter:blur(10px);

    line-height:1.5;
}

body.dark .chat-input,
body.dark .chat-output{
    background:rgba(255,255,255,0.1);
    color:white;
}

/* FILE BUTTON */
.file-menu-btn{
    position:absolute;

    top:50%;
    right:10px;

    transform:translateY(-50%);

    width:32px;
    height:32px;

    border:none;
    border-radius:10px;

    background:rgba(0,0,0,0.2);

    color:white;

    cursor:pointer;
}

/* FILE POPUP */
.file-popup{
    position:absolute;

    top:65px;
    right:10px;

    width:220px;

    background:rgba(255,255,255,0.95);

    backdrop-filter:blur(14px);

    border-radius:16px;

    padding:12px;

    display:none;

    flex-direction:column;

    gap:10px;

    z-index:9999;

    box-shadow:0 0 20px rgba(0,0,0,0.2);
}

body.dark .file-popup{
    background:rgba(30,30,40,0.96);
    color:white;
}

/* SELECT */
select{
    width:100%;

    padding:12px;

    border:none;
    border-radius:18px;

    outline:none;

    background:rgba(255,255,255,0.65);

    font-size:15px;
}

body.dark select{
    background:rgba(255,255,255,0.1);
    color:white;
}

/* BUTTON */
.btn{
    width:100%;

    padding:13px;

    border:none;
    border-radius:22px;

    background:linear-gradient(
        90deg,
        #6a11cb,
        #2575fc
    );

    color:white;

    cursor:pointer;

    transition:0.3s;

    font-size:15px;
}

.btn:hover{
    transform:scale(1.02);
}

/* ROW */
.row{
    display:flex;
    gap:10px;
}

/* SMALL BUTTONS */
.small-btn{
    flex:1;

    padding:12px;

    border:none;
    border-radius:20px;

    background:linear-gradient(
        90deg,
        #4facfe,
        #00f2fe
    );

    color:white;

    cursor:pointer;

    transition:0.3s;
}

.small-btn:hover{
    transform:scale(1.03);
}

/* CAMERA MODAL */
.camera-modal{
    position:fixed;

    top:0;
    left:0;

    width:100%;
    height:100%;

    background:rgba(0,0,0,0.97);

    display:none;

    flex-direction:column;

    align-items:center;
    justify-content:center;

    padding:20px;

    z-index:99999;
}

/* CAMERA VIDEO */
.camera-modal video{
    width:100%;
    max-width:520px;

    border-radius:20px;

    background:black;

    border:3px solid white;

    object-fit:cover;

    box-shadow:0 0 30px rgba(255,255,255,0.2);
}

/* CAMERA BUTTONS */
.camera-modal button{
    padding:12px 18px;

    border:none;
    border-radius:14px;

    background:linear-gradient(
        90deg,
        #4facfe,
        #00f2fe
    );

    color:white;

    cursor:pointer;

    font-size:15px;

    transition:0.3s;
}

.camera-modal button:hover{
    transform:scale(1.05);
}

/* STATUS */
#scanStatus{
    padding:10px 16px;

    background:rgba(255,255,255,0.1);

    border-radius:12px;

    margin-top:15px;

    backdrop-filter:blur(10px);
}

/* ANIMATIONS */
@keyframes fadeIn{

    from{
        opacity:0;
        transform:translateY(20px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}

@keyframes bgMove{

    0%{
        background-position:0% 50%;
    }

    50%{
        background-position:100% 50%;
    }

    100%{
        background-position:0% 50%;
    }

}

/* MOBILE */
@media(max-width:500px){

    .card{
        padding:16px;
    }

    .welcome-box{
        padding:25px 18px;
    }

    .camera-modal video{
        width:95%;
    }

    .btn,
    .small-btn{
        font-size:14px;
    }

}
