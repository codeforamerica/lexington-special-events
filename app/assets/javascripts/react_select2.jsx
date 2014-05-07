/**
 * @jsx React.DOM
 */
var ReactSelect2 = React.createClass({
    propTypes: {
        // Array of <option /> components to be placed into the select
        children: React.PropTypes.array,

        name: React.PropTypes.string,
        multiple: React.PropTypes.bool,

        // The initial selected value; one of the option children should have a
        // matching value="..."
        defaultValue: React.PropTypes.string,

        // Callback executed when the selected value changes; receives a single
        // jQuery event object `e` from select2; `e.target` refers to the real
        // <select> element and `e.val` refers to the new selected value
        onChange: React.PropTypes.func
    },

    render: function() {
        return <select
                defaultValue={this.props.defaultValue}
                name={this.props.name}
                multiple={this.props.multiple}>
            {this.props.children}
        </select>;
    },

    componentDidMount: function() {
      var rootNode = this.getDOMNode();
        $(rootNode).select2();

        if (this.props.defaultValue != null) {
            $(rootNode).select2("val", this.props.defaultValue);
        }

        $(rootNode).on("change", this._handleChange);
    },

    componentWillUnmount: function() {
        var rootNode = this.getDOMNode();
        $(rootNode).select2("destroy");
    },

    _handleChange: function(e) {
        this.props.onChange && this.props.onChange(e);
    }
});
