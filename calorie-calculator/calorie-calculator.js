'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicActivity = function (_React$Component) {
    _inherits(BasicActivity, _React$Component);

    function BasicActivity(props) {
        _classCallCheck(this, BasicActivity);

        var _this = _possibleConstructorReturn(this, (BasicActivity.__proto__ || Object.getPrototypeOf(BasicActivity)).call(this, props));

        _this.handleChange = function (event) {
            var target = event.target;
            var value = target.value;
            _this.setState({
                activity_level: value
            });
            _this.props.onActivityUpdate(_this.props.pluginName, value, true);
        };

        _this.state = {
            activity_level: props.initialValue
        };
        return _this;
    }

    _createClass(BasicActivity, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    { htmlFor: "avg_activity_level" },
                    "Average Activity Level:"
                ),
                "\xA0",
                React.createElement(
                    "select",
                    { name: "avg_activity_level", id: "avg_activity_level", onChange: this.handleChange, value: this.state.activity_level },
                    React.createElement(
                        "option",
                        { value: "1.15" },
                        "Inactive"
                    ),
                    React.createElement(
                        "option",
                        { value: "1.4" },
                        "Little or no activity"
                    ),
                    React.createElement(
                        "option",
                        { value: "1.65" },
                        "Some activity and movement"
                    ),
                    React.createElement(
                        "option",
                        { value: "1.85" },
                        "More activity and movement"
                    ),
                    React.createElement(
                        "option",
                        { value: "2.2" },
                        "Extensive work or excercise"
                    )
                )
            );
        }
    }]);

    return BasicActivity;
}(React.Component);

var AdvancedActivity = function (_React$Component2) {
    _inherits(AdvancedActivity, _React$Component2);

    function AdvancedActivity(props) {
        _classCallCheck(this, AdvancedActivity);

        var _this2 = _possibleConstructorReturn(this, (AdvancedActivity.__proto__ || Object.getPrototypeOf(AdvancedActivity)).call(this, props));

        _this2.advancedPalValues = [{ description: 'Rest. Sleep, lie down', value: 1 }, { description: 'Inactivity. Sit calmly, watch tv, drive a car', value: 1.2 }, { description: 'Very easy activity. Sitting work, office work', value: 1.5 }, { description: 'Make food, eat', value: 2 }, { description: 'Easy housework, standing work, quiet walk', value: 3 }, { description: 'Go hike, ride 16 km / h', value: 4 }, { description: 'Easy aerobics', value: 5 }, { description: 'Heavier housework, easy exercise', value: 6 }, { description: 'Jogging 7 km / h, easy sports', value: 7 }, { description: 'Lavintens sport, eg basketball', value: 8 }, { description: 'Physical work, snow racing', value: 9 }, { description: 'Medium intense sports, such as soccer, running 10 km / h, swimming', value: 10 }, { description: 'Intense sports, eg cycling 25-30 km / h, rowing', value: 12 }, { description: 'High-speed sports such as running 16 km / h, fast dance, cross country skiing, aerobics', value: 16 }];

        _this2.handleChange = function (event) {
            var values = _this2.state.activity_value.slice();
            var target = event.target;
            var value = target.value;
            var name = target.name;
            var index = name.split("_")[1];
            values[index] = value;

            var ttl_hours = 0;
            for (var i = 0; i < values.length; i++) {
                ttl_hours += getNum(values[i]);
            }

            _this2.setState({
                activity_value: values,
                total_hours: ttl_hours
            });

            var is_valid = false;
            var activity_level = 0;

            if (ttl_hours == 24) {
                is_valid = true;
                activity_level = _this2.calculateActivityLevel(ttl_hours, values);
            }

            _this2.props.onActivityUpdate(_this2.props.pluginName, activity_level, is_valid);
        };

        _this2.state = {
            activity_value: Array(14).fill("0"),
            total_hours: 0
        };
        return _this2;
    }

    _createClass(AdvancedActivity, [{
        key: "calculateActivityLevel",
        value: function calculateActivityLevel(ttl_hours, values) {
            var activity_level = 0;

            for (var i = 0; i < values.length; i++) {
                activity_level += values[i] * this.advancedPalValues[i].value;
            }

            activity_level = activity_level / ttl_hours;

            return activity_level;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var activities = [];

            this.advancedPalValues.forEach(function (activity, index) {
                var activity_input_name = 'advancedActivityValue_' + index;
                activities.push(React.createElement(
                    "div",
                    { className: "inputBox clearfix" },
                    React.createElement(
                        "label",
                        null,
                        activity.description
                    ),
                    "\xA0",
                    React.createElement("input", { name: activity_input_name, type: "text", className: "input-hour", value: _this3.state.activity_value[index], onChange: _this3.handleChange })
                ));
            }, this);

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "intro-text" },
                    "Activity Level: Fill in how many hours you spend on each activity, a total of 24 hours. You can use comma if you do not want to complete hours. The result will show your daily calorie needs."
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "activity-inputs" },
                    activities
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "total-hours" },
                    "Number of hours completed: ",
                    this.state.total_hours
                )
            );
        }
    }]);

    return AdvancedActivity;
}(React.Component);

var CalorieCalculator = function (_React$Component3) {
    _inherits(CalorieCalculator, _React$Component3);

    function CalorieCalculator(props) {
        _classCallCheck(this, CalorieCalculator);

        var _this4 = _possibleConstructorReturn(this, (CalorieCalculator.__proto__ || Object.getPrototypeOf(CalorieCalculator)).call(this, props));

        _this4.handleInputChange = function (event) {
            var target = event.target;
            var value = target.value;
            var name = target.name;

            _this4.setState(_defineProperty({}, name, value));
        };

        _this4.setActivityType = function (event) {
            var target = event.target;
            var value = target.value;

            _this4.setState({
                activity_type: value
            });
        };

        _this4.calculate = function (event) {
            event.preventDefault();

            var activity_level = _this4.state.activity_level[_this4.state.activity_type];
            var bbeValue = _this4.state.gender == 'f' ? 655.1 + 9.6 * _this4.state.weight + 1.8 * _this4.state.height - 4.7 * _this4.state.age : 66.5 + 13.8 * _this4.state.weight + 5.0 * _this4.state.height - 6.8 * _this4.state.age;
            var teeValue = Math.round(bbeValue * activity_level);
            var results = {
                stable: teeValue,
                lose_half: teeValue - 500,
                lose_one: teeValue - 1000
            };

            _this4.setState({
                result_ready: true,
                result: results
            });
        };

        _this4.state = {
            gender: 'f',
            age: 0,
            height: 0,
            weight: 0,
            activity_type: 'basic',
            activity_level: {
                basic: 1.65,
                detail: 0
            },
            activity_level_valid: {
                basic: false,
                detail: false
            },
            result_ready: false,
            result: {
                stable: 0,
                lose_half: 0,
                lose_one: 0
            }
        };
        return _this4;
    }

    _createClass(CalorieCalculator, [{
        key: "setActivityLevelValues",
        value: function setActivityLevelValues(name, avg_value, is_valid) {
            var activity_level_valid = this.state.activity_level_valid;
            var activity_level = this.state.activity_level;

            activity_level_valid[name] = is_valid;
            activity_level[name] = avg_value;

            this.setState({
                activity_level: activity_level,
                activity_level_valid: activity_level_valid
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var activity_type_comp = void 0;
            var activity_type = this.state.activity_type;
            var activity_level = this.state.activity_level;

            if (this.state.activity_type == 'basic') {
                activity_type_comp = React.createElement(BasicActivity, { pluginName: activity_type, onActivityUpdate: function onActivityUpdate(name, avg_value, is_valid) {
                        return _this5.setActivityLevelValues(name, avg_value, is_valid);
                    }, initialValue: activity_level.basic });
            } else if (this.state.activity_type == 'detail') {
                activity_type_comp = React.createElement(AdvancedActivity, { pluginName: activity_type, onActivityUpdate: function onActivityUpdate(name, avg_value, is_valid) {
                        return _this5.setActivityLevelValues(name, avg_value, is_valid);
                    } });
            }

            var result = void 0;
            if (this.state.result_ready) {
                result = React.createElement(
                    "div",
                    { id: "activity-calculator-result", className: "row resultBoxes" },
                    React.createElement(
                        "div",
                        { className: "small-12" },
                        React.createElement(
                            "div",
                            { className: "resultItem" },
                            React.createElement(
                                "div",
                                { className: "resultTitle" },
                                "Keep the weight stable"
                            ),
                            React.createElement(
                                "div",
                                { id: "stable-result", className: "resultValue" },
                                this.state.result.stable
                            ),
                            React.createElement(
                                "div",
                                { className: "resultUnit" },
                                "kcal per day."
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "small-12" },
                        React.createElement(
                            "div",
                            { className: "resultItem" },
                            React.createElement(
                                "div",
                                { className: "resultTitle brandColor" },
                                "Go down 0.5 kg a week"
                            ),
                            React.createElement(
                                "div",
                                { id: "result-weight-loss-1", className: "resultValue" },
                                this.state.result.lose_half
                            ),
                            React.createElement(
                                "div",
                                { className: "resultUnit" },
                                "kcal per day."
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "small-12" },
                        React.createElement(
                            "div",
                            { className: "resultItem" },
                            React.createElement(
                                "div",
                                { className: "resultTitle brandColor" },
                                "Go down 1 kg a week"
                            ),
                            React.createElement(
                                "div",
                                { id: "result-weight-loss-2", className: "resultValue" },
                                this.state.result.lose_one
                            ),
                            React.createElement(
                                "div",
                                { className: "resultUnit" },
                                "kcal per day."
                            )
                        )
                    )
                );
            }

            return React.createElement(
                "form",
                { id: "calorie-calculator" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Gender:"
                    ),
                    "\xA0\xA0",
                    React.createElement("input", { type: "radio", name: "gender", id: "gender_f", value: "f", checked: this.state.gender == 'f' ? true : false, onChange: this.handleInputChange }),
                    React.createElement(
                        "label",
                        { htmlFor: "gender_f" },
                        "Female"
                    ),
                    React.createElement("input", { type: "radio", name: "gender", id: "gender_m", value: "m", checked: this.state.gender == 'm' ? true : false, onChange: this.handleInputChange }),
                    React.createElement(
                        "label",
                        { htmlFor: "gender_m" },
                        "Male"
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Age:\xA0",
                        React.createElement("input", { type: "text", name: "age", value: this.state.age, onChange: this.handleInputChange }),
                        " years"
                    ),
                    "\xA0\xA0\xA0",
                    React.createElement(
                        "label",
                        null,
                        "Height:\xA0",
                        React.createElement("input", { type: "text", name: "height", value: this.state.height, onChange: this.handleInputChange }),
                        " cm"
                    ),
                    "\xA0\xA0\xA0",
                    React.createElement(
                        "label",
                        null,
                        "Weight:\xA0",
                        React.createElement("input", { type: "text", name: "weight", value: this.state.weight, onChange: this.handleInputChange }),
                        " kg"
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Activity level within a day:"
                    ),
                    "\xA0\xA0",
                    React.createElement("input", { type: "radio", name: "activity_type", id: "activity_type_avg", value: "basic",
                        checked: this.state.activity_type == 'basic' ? true : false, onChange: this.setActivityType }),
                    React.createElement(
                        "label",
                        { htmlFor: "activity_type_avg" },
                        "Average Activity"
                    ),
                    React.createElement("input", { type: "radio", name: "activity_type", id: "activity_type_detail", value: "detail",
                        checked: this.state.activity_type == 'detail' ? true : false, onChange: this.setActivityType }),
                    React.createElement(
                        "label",
                        { htmlFor: "activity_type_detail" },
                        "Detailed Activity"
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    activity_type_comp
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "button",
                        { onClick: this.calculate },
                        "Calculate"
                    )
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    null,
                    result
                )
            );
        }
    }]);

    return CalorieCalculator;
}(React.Component);

var domContainer = document.querySelector('#calorie-calculator');
ReactDOM.render(React.createElement(CalorieCalculator, null), domContainer);

function getNum(val) {
    return parseFloat(val.replace(/,/, '.'));
}