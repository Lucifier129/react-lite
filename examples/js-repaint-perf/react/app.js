/** @jsx React.DOM */

var DBMon = React.createClass({
  getInitialState: function() {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({ databases: ENV.generateData().toArray() });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples.bind(this), ENV.timeout);
  },

  componentDidMount: function() {
    this.loadSamples();
  },

  render: function() {
    return (
      <div id="container">
        <table className="table table-striped latest-data">
          <tbody>
            {
              this.state.databases.map(function(database) {
                return (
                  <tr key={database.dbname}>
                    <td className="dbname">
                      {database.dbname}
                    </td>
                    <td className="query-count">
                      <span className={database.lastSample.countClassName}>
                        {database.lastSample.queries.length}
                      </span>
                    </td>
                      {
                        database.lastSample.topFiveQueries.map(function(query, index) {
                          return (
                            <td className={ "Query " + query.elapsedClassName}>
                              {query.formatElapsed}
                              <div className="popover left">
                                <div className="popover-content">{query.query}</div>
                                <div className="arrow"/>
                              </div>
                            </td>
                          );
                        })
                      }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
});

React.render(<DBMon />, document.getElementById('dbmon'));







