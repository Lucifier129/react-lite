/** @jsx React.DOM */

var Query = React.createClass({
  render: function() {
    return (
      <td className={ "Query " + this.props.elapsedClassName}>
        {this.props.formatElapsed}
        <div className="popover left">
          <div className="popover-content">{this.props.query}</div>
          <div className="arrow"/>
        </div>
      </td>
    );
  }
})

var sample = function (database) {
  var _queries = [];
  database.lastSample.topFiveQueries.forEach(function(query, index) {
    _queries.push(
      <Query key={index}
        query={query.query}
        elapsed={query.elapsed}
        formatElapsed={query.formatElapsed}
        elapsedClassName={query.elapsedClassName} />
    );
  });
  return [
    <td className="query-count">
      <span className={database.lastSample.countClassName}>
        {database.lastSample.queries.length}
      </span>
    </td>,
    _queries
  ];
};

var Database = React.createClass({
  render: function() {
    var lastSample = this.props.lastSample;
    return (
      <tr key={this.props.dbname}>
        <td className="dbname">
          {this.props.dbname}
        </td>
        {sample(this.props)}
      </tr>
    );
  }
});

var DBMon = React.createClass({
  getInitialState: function() {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({
      databases: ENV.generateData().toArray()
    });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples, ENV.timeout);
  },

  componentDidMount: function() {
    this.loadSamples();
  },

  render: function() {
    var databases = [];
    Object.keys(this.state.databases).forEach(function(dbname) {
      databases.push(
        <Database key={dbname}
          dbname={dbname}
          samples={this.state.databases[dbname].samples} />
      );
    }.bind(this));

    var databases = this.state.databases.map(function(database) {
      return <Database 
        dbname={database.dbname}
        samples={database.samples}
        lastSample={database.lastSample} />
    });

    return (
      <div>
        <table className="table table-striped latest-data">
          <tbody>
            {databases}
          </tbody>
        </table>
      </div>
    );
  }
});

React.render(<DBMon />, document.getElementById('dbmon'));
