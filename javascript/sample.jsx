var Character = React.createClass({
  getInitialState: function(){
    return {
      classes: {},
      selectedClassValue: {
        "level": 0,
        "vigor": 0,
        "attunement": 0,
        "endurance": 0,
        "vitality": 0,
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "faith": 0,
        "luck": 0
      },
      allocationValue: {
        "level": 0,
        "vigor": 0,
        "attunement": 0,
        "endurance": 0,
        "vitality": 0,
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "faith": 0,
        "luck": 0
      },
      status: {
        "level": 0,
        "vigor": 0,
        "attunement": 0,
        "endurance": 0,
        "vitality": 0,
        "strength": 0,
        "dexterity": 0,
        "intelligence": 0,
        "faith": 0,
        "luck": 0
      }
    };
  },

  loadCommentsFromServer: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: 'false',
			success: function(data){
				this.setState({ classes: data });
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

  componentDidMount: function(){
    this.loadCommentsFromServer();
  },

  setStateSelectedClass: function(value){
    var selClass = this.state.classes[value];
    this.setState({
      selectedClassValue: {
        "level": selClass.level,
        "vigor": selClass.vigor,
        "attunement": selClass.attunement,
        "endurance": selClass.endurance,
        "vitality": selClass.vitality,
        "strength": selClass.strength,
        "dexterity": selClass.dexterity,
        "intelligence": selClass.intelligence,
        "faith": selClass.faith,
        "luck": selClass.luck
      },
      status: {
        "level": this.state.selectedClassValue.level,
        "vigor": this.state.selectedClassValue.vigor,
        "attunement": this.state.selectedClassValue.attunement,
        "endurance": this.state.selectedClassValue.endurance,
        "vitality": this.state.selectedClassValue.vitality,
        "strength": this.state.selectedClassValue.strength,
        "dexterity": this.state.selectedClassValue.dexterity,
        "intelligence": this.state.selectedClassValue.intelligence,
        "faith": this.state.selectedClassValue.faith,
        "luck": this.state.selectedClassValue.luck
      }
    });
  },

  render: function() {
    if (this.state.classes === null) return null;
    return (
      <div>
        <ClassesSelect classes={this.state.classes} onChange={this.setStateSelectedClass} />
        <StatusViewer selectedClassValue={this.state.selectedClassValue} status={this.state.status} />
      </div>
    );
  }
});

var ClassesSelect = React.createClass({
  _onChange: function (e) {
    this.props.onChange(e.target.value);
  },

  render: function() {
    return (
      <select onChange={this._onChange}>
        <option value="knight">騎士</option>
        <option value="mercenary">傭兵</option>
        <option value="warrior">戦士</option>
        <option value="herald">伝令</option>
        <option value="thief">盗人</option>
        <option value="assassin">刺客</option>
        <option value="sorcerer">魔術師</option>
        <option value="pyromancer">呪術師</option>
        <option value="cleric">聖職者</option>
        <option value="deprived">持たざる者</option>
      </select>
    );
  }
});

var StatusViewer = React.createClass({
  render: function() {
    return(
      <table>
        <tbody>
          <tr>
            <td>レベル</td>
            <td>{this.props.status.level}</td>
          </tr>
          <tr>
            <td>生命力</td>
            <td>{this.props.status.vigor}</td>
          </tr>
          <tr>
            <td>集中力</td>
            <td>{this.props.status.attunement}</td>
          </tr>
          <tr>
            <td>持久力</td>
            <td>{this.props.status.endurance}</td>
          </tr>
          <tr>
            <td>体力</td>
            <td>{this.props.status.vitality}</td>
          </tr>
          <tr>
            <td>筋力</td>
            <td>{this.props.status.strength}</td>
          </tr>
          <tr>
            <td>技量</td>
            <td>{this.props.status.dexterity}</td>
          </tr>
          <tr>
            <td>理力</td>
            <td>{this.props.status.intelligence}</td>
          </tr>
          <tr>
            <td>信仰</td>
            <td>{this.props.status.faith}</td>
          </tr>
          <tr>
            <td>運</td>
            <td>{this.props.status.luck}</td>
          </tr>
        </tbody>
      </table>
    );
  }
});

ReactDOM.render(
	<Character url="./json/classes.json" />,
	document.getElementById('app')
);