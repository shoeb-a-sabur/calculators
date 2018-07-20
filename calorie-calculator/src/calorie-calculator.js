'use strict';

class BasicActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity_level: props.initialValue,
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            activity_level: value,
        });
        this.props.onActivityUpdate(this.props.pluginName, value, true);
    }

    render() {
        return (
            <div>
                <label htmlFor="avg_activity_level">Average Activity Level:</label>&nbsp;
                <select name="avg_activity_level" id="avg_activity_level" onChange={this.handleChange} value={this.state.activity_level}>
                    <option value="1.15">Inactive</option>
                    <option value="1.4">Little or no activity</option>
                    <option value="1.65">Some activity and movement</option>
                    <option value="1.85">More activity and movement</option>
                    <option value="2.2">Extensive work or excercise</option>
                </select>
            </div>
        );
    }
}

class AdvancedActivity extends React.Component {
    advancedPalValues = [
        {description: 'Rest. Sleep, lie down', value: 1},
        {description: 'Inactivity. Sit calmly, watch tv, drive a car', value: 1.2},
        {description: 'Very easy activity. Sitting work, office work', value: 1.5},
        {description: 'Make food, eat', value: 2},
        {description: 'Easy housework, standing work, quiet walk', value: 3},
        {description: 'Go hike, ride 16 km / h', value: 4},
        {description: 'Easy aerobics', value: 5},
        {description: 'Heavier housework, easy exercise', value: 6},
        {description: 'Jogging 7 km / h, easy sports', value: 7},
        {description: 'Lavintens sport, eg basketball', value: 8},
        {description: 'Physical work, snow racing', value: 9},
        {description: 'Medium intense sports, such as soccer, running 10 km / h, swimming', value: 10},
        {description: 'Intense sports, eg cycling 25-30 km / h, rowing', value: 12},
        {description: 'High-speed sports such as running 16 km / h, fast dance, cross country skiing, aerobics', value: 16}
    ];

    constructor(props) {
        super(props);
        this.state = {
            activity_value: Array(14).fill("0"),
            total_hours: 0,
        };
    }

    handleChange = (event) => {
        const values = this.state.activity_value.slice();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const index = name.split("_")[1];
        values[index] = value;

        let ttl_hours = 0;
        for( let i = 0; i < values.length; i++ ) {
            ttl_hours += getNum(values[i]);
        }

        this.setState({
            activity_value: values,
            total_hours: ttl_hours,
        });

        let is_valid = false;
        let activity_level = 0;

        if( ttl_hours == 24 ) {
            is_valid = true;
            activity_level = this.calculateActivityLevel(ttl_hours, values);
        }

        this.props.onActivityUpdate(this.props.pluginName, activity_level, is_valid);
    }

    calculateActivityLevel(ttl_hours, values) {
        let activity_level = 0;

        for( let i = 0; i < values.length; i++ ) {
            activity_level += values[i] * this.advancedPalValues[i].value;
        }

        activity_level = activity_level / ttl_hours;

        return activity_level;
    }

    render() {
        let activities = [];

        this.advancedPalValues.forEach((activity, index) => {
            let activity_input_name = 'advancedActivityValue_' + index;
            activities.push(
                <div className="inputBox clearfix">
                    <label>{activity.description}</label>&nbsp;
                    <input name={activity_input_name} type="text" className="input-hour" value={this.state.activity_value[index]} onChange={this.handleChange} />
                </div>
            );
        }, this);

        return (
            <div>
                <div className="intro-text">
                    Activity Level: Fill in how many hours you spend on each activity, a total of 24 hours. You can use comma if you do not want to complete hours. The result will show your daily calorie needs.
                </div>
                <br/>
                <div className="activity-inputs">
                    {activities}
                </div>
                <br/>
                <div className="total-hours">Number of hours completed: {this.state.total_hours}</div>
            </div>
        );
    }
}

class CalorieCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: 'f',
            age: 0,
            height: 0,
            weight: 0,
            activity_type: 'basic',
            activity_level: {
                basic: 1.65,
                detail: 0,
            },
            activity_level_valid: {
                basic: false,
                detail: false,
            },
            result_ready: false,
            result: {
                stable: 0,
                lose_half: 0,
                lose_one: 0,
            },
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    setActivityType = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState({
            activity_type: value
        });
    }

    setActivityLevelValues(name, avg_value, is_valid) {
        let activity_level_valid = this.state.activity_level_valid;
        let activity_level = this.state.activity_level;

        activity_level_valid[name] = is_valid;
        activity_level[name] = avg_value;

        this.setState({
            activity_level: activity_level,
            activity_level_valid: activity_level_valid,
        });
    }

    calculate = (event) => {
        event.preventDefault();

        let activity_level = this.state.activity_level[this.state.activity_type];
        let bbeValue = (this.state.gender == 'f') ? 655.1 + (9.6 * this.state.weight) + (1.8 * this.state.height) - (4.7 * this.state.age) : 66.5 + (13.8 * this.state.weight) + (5.0 * this.state.height) - (6.8 * this.state.age);
        let teeValue = Math.round(bbeValue * activity_level);
        let results = {
            stable: teeValue,
            lose_half: teeValue - 500,
            lose_one: teeValue - 1000,
        };

        this.setState({
            result_ready: true,
            result: results,
        });
    }

    render() {
        let activity_type_comp;
        const activity_type = this.state.activity_type;
        const activity_level = this.state.activity_level;

        if( this.state.activity_type == 'basic' ) {
            activity_type_comp = <BasicActivity pluginName={activity_type} onActivityUpdate={(name, avg_value, is_valid) => this.setActivityLevelValues(name, avg_value, is_valid)} initialValue={activity_level.basic} />;
        }
        else if( this.state.activity_type == 'detail' ) {
            activity_type_comp = <AdvancedActivity pluginName={activity_type} onActivityUpdate={(name, avg_value, is_valid) => this.setActivityLevelValues(name, avg_value, is_valid)} />;
        }

        let result;
        if( this.state.result_ready ) {
            result = (
                <div id="activity-calculator-result" className="row resultBoxes">
                    <div className="small-12">
                        <div className="resultItem">
                            <div className="resultTitle">Keep the weight stable</div>
                            <div id="stable-result" className="resultValue">{this.state.result.stable}</div>
                            <div className="resultUnit">kcal per day.</div>
                        </div>
                    </div>
                    <div className="small-12">
                        <div className="resultItem">
                            <div className="resultTitle brandColor">Go down 0.5 kg a week</div>
                            <div id="result-weight-loss-1" className="resultValue">{this.state.result.lose_half}</div>
                            <div className="resultUnit">kcal per day.</div>
                        </div>
                    </div>
                    <div className="small-12">
                        <div className="resultItem">
                            <div className="resultTitle brandColor">Go down 1 kg a week</div>
                            <div id="result-weight-loss-2" className="resultValue">{this.state.result.lose_one}</div>
                            <div className="resultUnit">kcal per day.</div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <form id="calorie-calculator">
                <div>
                    <label>
                        Gender:
                    </label>&nbsp;&nbsp;
                    <input type="radio" name="gender" id="gender_f" value="f" checked={this.state.gender == 'f' ? true : false} onChange={this.handleInputChange} />
                    <label htmlFor="gender_f">Female</label>
                    <input type="radio" name="gender" id="gender_m" value="m" checked={this.state.gender == 'm' ? true : false} onChange={this.handleInputChange} />
                    <label htmlFor="gender_m">Male</label>
                </div>
                <br/>
                <div>
                    <label>
                        Age:&nbsp;
                        <input type="text" name="age" value={this.state.age} onChange={this.handleInputChange} /> years
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        Height:&nbsp;
                        <input type="text" name="height" value={this.state.height} onChange={this.handleInputChange} /> cm
                    </label>&nbsp;&nbsp;&nbsp;
                    <label>
                        Weight:&nbsp;
                        <input type="text" name="weight" value={this.state.weight} onChange={this.handleInputChange} /> kg
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        Activity level within a day:
                    </label>&nbsp;&nbsp;
                    <input type="radio" name="activity_type" id="activity_type_avg" value="basic"
                           checked={this.state.activity_type == 'basic' ? true : false} onChange={this.setActivityType}/>
                    <label htmlFor="activity_type_avg">Average Activity</label>
                    <input type="radio" name="activity_type" id="activity_type_detail" value="detail"
                           checked={this.state.activity_type == 'detail' ? true : false} onChange={this.setActivityType}/>
                    <label htmlFor="activity_type_detail">Detailed Activity</label>
                </div>
                <br/>
                <div>
                    {activity_type_comp}
                </div>
                <br/><br/>
                <div>
                    <button onClick={this.calculate}>Calculate</button>
                </div>
                <br/><br/>
                <div>
                    {result}
                </div>
            </form>
        );
    }
}

let domContainer = document.querySelector('#calorie-calculator');
ReactDOM.render(<CalorieCalculator />, domContainer);

function getNum( val ) {
    return parseFloat(val.replace(/,/, '.'));
}