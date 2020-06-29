(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{101:function(e,t){},133:function(e,t,a){},136:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(21),r=a.n(l),o=(a(70),a(1)),i=a(32),c=a(3),m=a(4),u=a(5),d=a(6),h=a(9),v=a.n(h),p="https://iciciback.livestudio.cloud/";v()(p);var E=function(e){return localStorage.getItem(e)},f=function(e,t){return t=localStorage.setItem(e,t)},g=function(e){var t=E(e);return null!==t&&t&&""!==t?JSON.parse(t):""},b=a(15),y=a.n(b),N="https://iciciback.livestudio.cloud/",k=function(e){return E(e)},w=function(e,t){var a=k("token");return y()({method:"post",url:N+e,headers:{"content-type":"application/json",Authorization:"Bearer "+a},data:t})},C=function(e,t){var a=k("token");return y()({method:"put",url:N+e,headers:{"content-type":"application/json",Authorization:"Bearer "+a},data:t})},A=function(e){var t=k("token");return y()({method:"get",url:N+e,headers:{"content-type":"application/json",Authorization:"Bearer "+t}})},S=function(e){return y()({method:"get",url:N+e,headers:{"content-type":"application/json"}})},P=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={id:"",Time:n.props.Time,event:"",hours:0,minutes:0,days:0},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.myInterval=setInterval((function(){var t=function(e){var t=new Date,a=new Date(e).getTime()-t.getTime();a/=1e3;var n=Math.floor(a/86400);a-=86400*n;var s=Math.floor(a/3600);a-=3600*s;var l=Math.floor(a/60)%60;return a-=60*l,{days:isNaN(n)?0:n,hours:isNaN(s)?0:s,minutes:isNaN(l)?0:l}}(e.props.Time),a=t.hours,n=t.minutes,s=t.days;e.setState({days:s,hours:a,minutes:n})}),1e3)}},{key:"render",value:function(){return s.a.createElement("div",{className:"welcomeHeader"},s.a.createElement("header",{className:"justify-content-space"},s.a.createElement("div",{className:"digi"},s.a.createElement("a",{href:"#"},s.a.createElement("img",{src:"img/branding2.png",alt:""}))),s.a.createElement("div",{className:"digilife text-right"},s.a.createElement("div",null,s.a.createElement("a",{href:"#"},s.a.createElement("img",{src:"img/main-logo.png",alt:""}))))),s.a.createElement("section",{className:"welcomeContainer text-center"},s.a.createElement("div",{className:"titleArea"},s.a.createElement("h1",null,"Welcome"),s.a.createElement("div",{className:"text-left"},s.a.createElement("span",{className:"inlineItem leftSide"},"To"),s.a.createElement("div",{className:"inlineItem digiLifeTitle"},s.a.createElement("span",null,"Digital"),s.a.createElement("span",{className:"bigFont"},"Life"),s.a.createElement("span",null,"Simplified")))),s.a.createElement("p",{className:"lead"},"WEB EVENT"),s.a.createElement("div",{className:"countArea"},s.a.createElement("div",{className:"counts"},s.a.createElement("span",null,this.state.days),s.a.createElement("span",null,this.state.hours),s.a.createElement("span",null,this.state.minutes)),s.a.createElement("div",{className:"blockItem"},s.a.createElement("div",{className:"countName"},s.a.createElement("span",null,"DAYS"),s.a.createElement("span",null,"HOURS"),s.a.createElement("span",null,"MINUTES"))))))}}]),a}(s.a.Component),x=a(14),O=a(2),j=a.n(O),I={WaitingPage:P,EventPage:function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={Url:n.props.Url,isPublish:!1,Message:"",id:0,Question:"",Answer:"",a:"",b:"",c:"",d:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.hidePopup(),v()(p).on("CurrentPoll",(function(t){console.log(t),e.setState({id:t.id,Question:t.question,a:t.surveyOption.a,b:t.surveyOption.b,c:t.surveyOption.c,d:t.surveyOption.d,isPublish:t.isPublished}),t.isPublished||e.hidePopup()}))}},{key:"hidePopup",value:function(){j()(".poll").hide(),j()(".actionArea").hide(),j()(".questionBox").hide(),j()(".blackOverlay").hide(),this.setState({Answer:"",Message:""})}},{key:"openPoll",value:function(){if(this.state.id<1||!1===this.state.isPublish)return"";j()(".blackOverlay").show(),j()(".actionArea").show(),j()(".poll").show(),j()(".questionBox").hide(),j()(this).toggleClass("active"),j()("#ques").removeClass("active")}},{key:"openQuestion",value:function(){j()(".blackOverlay").show(),j()(".actionArea").show(),j()(".questionBox").show(),j()(".poll").hide(),j()(this).toggleClass("active"),j()("#poll").removeClass("active")}},{key:"sendMessage",value:function(e){var t=this;e.preventDefault();var a={userId:g("User").uid,query:this.state.Message};w("survey/query",a).then((function(e){1==(e=e.data).status&&(t.setState({Message:""}),t.hidePopup())}))}},{key:"savePoll",value:function(e){var t=this;if(e.preventDefault(),!this.state.isPublish)return"";var a=g("User"),n={qId:this.state.id,userId:a.uid,optId:this.state.Answer};w("survey/poll",n).then((function(e){1==(e=e.data).status&&(t.setState({isPublish:!1}),t.hidePopup())}))}},{key:"onRadioChange",value:function(e){this.setState({Answer:e.target.value})}},{key:"onChange",value:function(e){this.setState(Object(x.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("section",null,s.a.createElement("div",{className:"banner background-Black"},s.a.createElement("iframe",{id:"ytplayer",type:"text/html",width:"100%",height:"90%",src:this.state.Url+"&modestbranding=1&controls=0",frameborder:"0",allow:"fullscreen"})),s.a.createElement("div",{className:"blackOverlay"},s.a.createElement("div",{className:"actionArea"},s.a.createElement("div",{style:{float:"right"},className:"font25 pointer",onClick:function(t){return e.hidePopup()}},s.a.createElement("svg",{className:"bi bi-x",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{"fill-rule":"evenodd",d:"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z","clip-rule":"evenodd"}),s.a.createElement("path",{"fill-rule":"evenodd",d:"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z","clip-rule":"evenodd"}))),s.a.createElement("div",{className:"poll"},s.a.createElement("div",{className:"space"},s.a.createElement("h3",null,this.state.Question),s.a.createElement("form",null,s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"choice"},s.a.createElement("input",{type:"radio",checked:"a"==this.state.Answer,onChange:function(t){return e.onRadioChange(t)},className:"form-control",id:"yes",value:"a",name:"radioGroup"}),s.a.createElement("label",{htmlFor:"yes"},this.state.a))),s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"choice"},s.a.createElement("input",{type:"radio",checked:"b"==this.state.Answer,onChange:function(t){return e.onRadioChange(t)},className:"form-control",id:"no",value:"b",name:"radioGroup"}),s.a.createElement("label",{htmlFor:"no"},this.state.b))),s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"choice"},s.a.createElement("input",{type:"radio",checked:"c"==this.state.Answer,onChange:function(t){return e.onRadioChange(t)},className:"form-control",id:"notsure",value:"c",name:"radioGroup"}),s.a.createElement("label",{htmlFor:"notsure"},this.state.c))),s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"choice"},s.a.createElement("input",{type:"radio",checked:"d"==this.state.Answer,onChange:function(t){return e.onRadioChange(t)},className:"form-control",id:"yesmaybe",value:"d",name:"radioGroup"}),s.a.createElement("label",{htmlFor:"yesmaybe"},this.state.d))),s.a.createElement("input",{type:"button",onClick:function(t){return e.savePoll(t)},className:"btn",value:"submit"})))),s.a.createElement("div",{className:"questionBox"},s.a.createElement("div",{className:"space"},s.a.createElement("h2",null,"Ask your question"),s.a.createElement("form",{className:"bottomForm",onSubmit:function(t){return e.sendMessage(t)}},s.a.createElement("textarea",{name:"Message",value:this.state.Message,onChange:function(t){return e.onChange(t)},placeholder:"Please type your relevant question"}),s.a.createElement("div",{className:"marginSide"},s.a.createElement("input",{type:"submit",className:"btn",value:"submit"})))))))),s.a.createElement("footer",null,s.a.createElement("div",{className:"menu"},s.a.createElement("a",{href:"#",onClick:function(t){return e.openPoll()},className:this.state.isPublish?"newPoll":"",id:"poll"},"Poll"),s.a.createElement("a",{href:"#",onClick:function(t){return e.openQuestion()},id:"ques"},"Ask a Question"))))}}]),a}(s.a.Component),ThankYou:function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"thankYou"},s.a.createElement("header",null,s.a.createElement("div",{className:"digi text-center"},s.a.createElement("a",{href:""},s.a.createElement("img",{src:"img/branding2.png",alt:""}))),s.a.createElement("div",{className:"digilife text-right"},s.a.createElement("div",null,s.a.createElement("a",{href:""},s.a.createElement("img",{src:"img/all.png",alt:""}))))),s.a.createElement("section",{className:"thankyouContainer text-center"},s.a.createElement("div",{className:"borderAround"},s.a.createElement("h1",null,"Thank you"),s.a.createElement("p",{className:"lead"},"For Attending the webinar")),s.a.createElement("div",null,s.a.createElement("p",{className:"borderArea"},s.a.createElement("span",{className:"blockItem"},"Please mail your valuable feedback on  the email ID mentioned below")," ",s.a.createElement("a",{href:"mailto:feedback@digi-life.in"},"feedback@digi-life.in")))))}}]),a}(s.a.Component)},Q=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={Component:"WaitingPage",Url:"",Time:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;S("event/event/1").then((function(t){0!=(t=t.data).status&&1!=t.status||e.setState({Time:t.data.startTime})}));var t=new URLSearchParams(this.props.location.search),a=t.get("eventId"),n=t.get("userId"),s=g("User");a&&n?""!==s?this.openSocket():S("user/verifyuser"+this.props.location.search).then((function(t){var a,n;1==(t=t.data).status&&(a="User",n=t.data,f(a,JSON.stringify(n)),e.openSocket())})):""!==s&&this.openSocket()}},{key:"openSocket",value:function(){var e=this;v()(p).on("eventStart",(function(t){console.log(t),t.over?e.setState({Component:"ThankYou"}):!0===t.start?e.setState({Component:"EventPage",Url:t.url}):e.setState({Component:"WaitingPage"})}))}},{key:"render",value:function(){var e=I[this.state.Component];return s.a.createElement("div",{className:"App"},s.a.createElement(e,{Url:this.state.Url,Time:this.state.Time}))}}]),a}(s.a.Component),M=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={UserName:"",Password:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=E("token");e&&""!==e&&this.props.history.push("/config")}},{key:"onLogin",value:function(e){var t=this;e.preventDefault();var a={userId:this.state.UserName,pswd:this.state.Password};w("user/adminauth",a).then((function(e){1==(e=e.data).status?(f("token",e.token),t.props.history.push("/config")):alert(e.message)}))}},{key:"onChange",value:function(e){this.setState(Object(x.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App"},s.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",integrity:"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",crossorigin:"anonymous"}),s.a.createElement("div",{className:"container"},s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("div",{className:"card margin-0-auto",style:{width:"500px"}},s.a.createElement("div",{className:"card-body"},s.a.createElement("form",{onSubmit:function(t){return e.onLogin(t)}},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"exampleInputEmail1"},"User Name"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},name:"UserName",type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp"}),s.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"We'll never share your email with anyone else.")),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Password"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},name:"Password",type:"password",className:"form-control",id:"exampleInputPassword1"})),s.a.createElement("div",{className:"form-group form-check"},s.a.createElement("input",{type:"checkbox",className:"form-check-input",id:"exampleCheck1"}),s.a.createElement("label",{className:"form-check-label",htmlFor:"exampleCheck1"},"Check me out")),s.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit"))))))))}}]),a}(s.a.Component),D=a(63),R=a.n(D),F=(a(120),a(133),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState({StartDate:e._d})},n.state={list:[{id:1,user:"Aj",time:"2020-12-12 12:30",message:"Cras justo odio"}],Poll:[],StartDate:"",url:"sd",Question:"",Ans1:"",Ans2:"",Ans3:"",Ans4:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=E("token");t&&""!==t||this.props.history.push("/login"),v()(p).on("listmessage",(function(t){console.log(t);var a=e.state.list;a.unshift(t),console.log(t,a),e.setState({list:a})})),A("survey/question").then((function(t){1==(t=t.data).status&&e.setState({Poll:t.data})}))}},{key:"renderQuestions",value:function(e){var t=this;return!e||e.length<1?s.a.createElement(s.a.Fragment,null):e.map((function(e,a){return s.a.createElement("li",{key:a,onClick:function(a){return t.selectQuestion(e)},className:"pointer list-group-item"},s.a.createElement("b",null,e.user)," (",e.time,") : ",e.message)}))}},{key:"selectQuestion",value:function(e){A("survey/userquery/"+e.id).then((function(e){e=e.data,console.log(e)}))}},{key:"makeLive",value:function(e){var t=this;C("survey/publish/"+e.id+"/"+(e.isPublished?0:1),{}).then((function(a){1==(a=a.data).status&&t.changetoggle(e)}))}},{key:"changetoggle",value:function(e){var t=this.state.Poll;t.forEach((function(t,a){t.id==e.id&&(t.isPublished=!e.isPublished)})),this.setState({Poll:t})}},{key:"removePoll",value:function(e){var t={id:e.id};w("removePoll",t).then((function(e){console.log(e)}))}},{key:"showResult",value:function(e){this.props.history.push("/pollresult",{pollId:e.id})}},{key:"renderPoll",value:function(e){var t=this;return!e||e.length<1?s.a.createElement(s.a.Fragment,null):e.map((function(e,a){return s.a.createElement("li",{key:a,className:"list-group-item row"},s.a.createElement("div",{className:"col-md-6"},e.question),s.a.createElement("div",{className:"col-md-3 row"},s.a.createElement("div",{className:"col-md-4"},"Live:"),s.a.createElement("div",{className:"col-md-8"},s.a.createElement(R.a,{value:e.isPublished,onToggle:function(a){return t.makeLive(e)}}))),s.a.createElement("div",{className:"col-md-3 row"},s.a.createElement("div",{className:"col-md-12 pointer",onClick:function(a){return t.showResult(e)}},"Show Results")),s.a.createElement("div",{className:"col-md-1 row text-right"},s.a.createElement("svg",{onClick:function(a){return t.removePoll(e)},className:"pointer color-red bi bi-trash",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("path",{d:"M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"}),s.a.createElement("path",{"fill-rule":"evenodd",d:"M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z","clip-rule":"evenodd"}))))}))}},{key:"saveQuestion",value:function(e){var t=this;e.preventDefault();var a={question:this.state.Question,option:{a:this.state.Ans1,b:this.state.Ans2,c:this.state.Ans3,d:this.state.Ans4}};w("survey/question",a).then((function(e){if(1==(e=e.data).status){var a=t.state.Poll;a.push(e.data),t.setState({Poll:a}),t.resetQuestion()}}))}},{key:"resetQuestion",value:function(){this.setState({Question:"",Ans1:"",Ans2:"",Ans3:"",Ans4:""})}},{key:"onChange",value:function(e){this.setState(Object(x.a)({},e.target.name,e.target.value))}},{key:"onStartDateSave",value:function(){var e={StartDate:this.state.StartDate};w("event/event/1",e).then((function(e){1==(e=e.data).status&&console.log(e)}))}},{key:"onStartEvent",value:function(){return window.confirm("Do you want to start the session early?")&&window.confirm("Are you sure?")?void C("event/startevent/1/1",{}).then((function(e){1==(e=e.data).status&&console.log(e)})):""}},{key:"onEndEvent",value:function(){return window.confirm("Do you want to end the session?")&&window.confirm("Are you sure?")?void C("event/startevent/1/0",{}).then((function(e){1==(e=e.data).status&&console.log(e)})):""}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"wrapper container"},s.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",integrity:"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",crossorigin:"anonymous"}),s.a.createElement("h2",null,"Event Details"),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-5"},s.a.createElement("div",{className:"row"},s.a.createElement("h3",null,"Event Start/End"),s.a.createElement("div",{className:"form-group"},s.a.createElement("button",{type:"button",onClick:function(t){return e.onStartEvent()},className:"col-md-4 btn btn-success"},"Start Event"),s.a.createElement("div",{className:"col-md-4"},"\xa0"),s.a.createElement("button",{type:"button",onClick:function(t){return e.onEndEvent()},className:"col-md-4 btn btn-danger"},"End Event"))),s.a.createElement("div",{className:"row"},s.a.createElement("h3",null,"Poll"),s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"col-md-4"},"Live Poll Url"),s.a.createElement("div",{className:"col-md-8"},this.state.url)),s.a.createElement("br",null),s.a.createElement("div",{className:"form-group"},s.a.createElement("ul",{className:"list-group list-group-flush"},this.renderPoll(this.state.Poll))),s.a.createElement("div",{className:"form-group card"},s.a.createElement("h3",null,"Add Poll"),s.a.createElement("div",{className:"card-body"},s.a.createElement("form",{onSubmit:function(t){return e.saveQuestion(t)},className:"margin-0-auto"},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"question"},"Question :"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},value:this.state.Question,name:"Question",type:"text",className:"form-control",id:"question","aria-describedby":"emailHelp"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"ans1"},"Answer 1"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},value:this.state.Ans1,name:"Ans1",type:"text",className:"form-control",id:"ans1","aria-describedby":"emailHelp"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"ans2"},"Answer 2"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},value:this.state.Ans2,name:"Ans2",type:"text",className:"form-control",id:"ans2"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"ans3"},"Answer 3"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},value:this.state.Ans3,name:"Ans3",type:"text",className:"form-control",id:"ans3"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{htmlFor:"ans4"},"Answer 4"),s.a.createElement("input",{onChange:function(t){return e.onChange(t)},value:this.state.Ans4,name:"Ans4",type:"text",className:"form-control",id:"ans4"})),s.a.createElement("div",{className:"form-group"},s.a.createElement("button",{type:"submit",className:"btn btn-primary col-md-4"},"Add Poll"),s.a.createElement("div",{className:"col-md-4"},"\xa0"),s.a.createElement("button",{type:"button",onClick:function(t){return e.resetQuestion()},className:"btn btn-primary col-md-4"},"Cancel")))))),s.a.createElement("br",null)),s.a.createElement("div",{className:"col-md-1"}),s.a.createElement("div",{className:"col-md-6"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("a",{href:"/selectedMessage",target:"_blank"},"Selected Messages"))),s.a.createElement("h3",null,"Questions"),s.a.createElement("div",{className:"form-group height300px"},s.a.createElement("ul",{className:"list-group list-group-flush"},this.renderQuestions(this.state.list))))))}}]),a}(s.a.Component)),U=a(22),q=a.n(U),T=a(33),B=a.n(T),H=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={id:0,Questions:"Lorem Ipsum is simply dummy text of the printing and typesetting industry",a:"yes",b:"no",c:"yyes",d:"nno",data:[12,100,3,5]},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.props.location&&this.props.location.state&&this.props.location.state.pollId&&(this.setState({id:this.props.location.state.pollId}),this.openSocket())}},{key:"openSocket",value:function(){var e=this;v()(p).on("pollResult",(function(t){console.log(t,e.state.id);var a={};if(t.forEach((function(t,n){t.questionId==e.state.id&&(a=t)})),Object.keys(a).length<1)return"";e.setState({a:a.A.name,b:a.B.name,c:a.C.name,d:a.D.name,data:[a.A.value,a.B.value,a.C.value,a.D.value],Questions:a.question},(function(){e.renderCanvas()}))}))}},{key:"renderCanvas",value:function(){var e=document.getElementById("myChart").getContext("2d");q.a.plugins.unregister(B.a),new q.a(e,{type:"bar",plugins:[B.a],data:{labels:["A","B","C","D"],datasets:[{label:"# of Votes",data:this.state.data,backgroundColor:["#b7181e","#40a89e","#6a76be","#f65f1e"],borderColor:["#b7181e","#40a89e","#6a76be","#f65f1e"],borderWidth:1}]},options:{plugins:{datalabels:{color:"white",labels:{title:{font:{weight:"bold"}},value:{color:"green"}}}},scales:{yAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"}}],xAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"}}]}}})}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",integrity:"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",crossorigin:"anonymous"}),s.a.createElement("div",{className:"container"},s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-6"},s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-body poolResult"},s.a.createElement("h2",{className:"card-title"},"Q: ",this.state.Questions)),s.a.createElement("div",null,s.a.createElement("ul",{className:"list-group list-group-flush"},s.a.createElement("li",{className:"listRender"},s.a.createElement("span",{style:{background:"#b7181e"},className:"colWidth"})," ",s.a.createElement("b",null,this.state.a)),s.a.createElement("li",{className:"listRender"},s.a.createElement("span",{style:{background:"#40a89e"},className:"colWidth"})," ",s.a.createElement("b",null,this.state.b)),s.a.createElement("li",{className:"listRender"},s.a.createElement("span",{style:{background:"#6a76be"},className:"colWidth"})," ",s.a.createElement("b",null,this.state.c)),s.a.createElement("li",{className:"listRender"},s.a.createElement("span",{style:{background:"#f65f1e"},className:"colWidth"})," ",s.a.createElement("b",null,this.state.d)))))),s.a.createElement("div",{className:"col-md-6"},s.a.createElement("canvas",{id:"myChart",width:"80px",height:"80px"})))))}}]),a}(s.a.Component),V=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={list:[]},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.openSocket()}},{key:"openSocket",value:function(){var e=this;v()(p).on("userQuery",(function(t){console.log(t);var a=e.state.list;a.unshift(t),e.setState({list:a})}))}},{key:"renderQuestions",value:function(e){return!e||e.length<1?s.a.createElement(s.a.Fragment,null):e.map((function(e,t){return s.a.createElement("li",{key:t,className:"list-group-item"},s.a.createElement("b",null,e.user.f_name)," (",e.time,") : ",e.message)}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("h3",null,"Questions"),s.a.createElement("div",{className:"form-group height300px"},s.a.createElement("ul",{className:"list-group list-group-flush"},this.renderQuestions(this.state.list))))}}]),a}(s.a.Component);var z=function(){return s.a.createElement(i.a,null,s.a.createElement(o.c,null,s.a.createElement(o.a,{path:"/",exact:!0,component:Q}),s.a.createElement(o.a,{path:"/login",exact:!0,component:M}),s.a.createElement(o.a,{path:"/config",exact:!0,component:F}),s.a.createElement(o.a,{path:"/pollresult",exact:!0,component:H}),s.a.createElement(o.a,{path:"/selectedMessage",exact:!0,component:V})))};var L=function(){return s.a.createElement(z,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},65:function(e,t,a){e.exports=a(136)},70:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.22a0c59f.chunk.js.map