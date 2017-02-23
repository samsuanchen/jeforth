var React=require("react");
var E=React.createElement;
var maincomponent = React.createClass({
  writeToFirebase:function(){
    var tempid='codeid'+Math.floor(Math.random()*100000);
    firebase.database().ref('sam/'+tempid).set({
      username: 'sam',
      code:'my forth code with id'+tempid
    });
  }
  ,getInitialState:function(){
    return {codes:[]};
  }
  ,renderCode:function(item){
    return E("div",{},item.code)
  }
  ,componentWillMount:function(){
    firebase.database().ref('sam').on('value',function(snapshot){
      if (snapshot.val()){
        const codes=Object.values(snapshot.val());
        this.setState({codes})        
      }
    }.bind(this));
  }
  ,render: function() {
    return E("div",{},
      this.state.codes.map(this.renderCode),
      E("button",{onClick:this.writeToFirebase},"write code")
    );
  }
});
module.exports=maincomponent;