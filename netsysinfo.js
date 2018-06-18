var apiUrl = "http://api.jok.fr"; //"http://localhost:2525"; //JoK.fr API Url to query
var server; //contains your server id

/*****************************
 * METRICS SYSTEM            *
 ****************************/

var metricSystemCpu = "cpu";
var metricSystemMemory = "memory";
var metricSystemCalls = "systemcalls";
var metricSystemException = "systemexception";
var metricSystemFileDataOperations = "systemfiledataoperations";
var metricSystemProcesses = "systemprocesses";
var metricSystemThreads = "systemthreads";
var metricsSystem = [metricSystemCpu, metricSystemMemory, metricSystemCalls, metricSystemException, metricSystemFileDataOperations, metricSystemProcesses, metricSystemThreads];

/*****************************
 * METRICS PROTOCOL          *
 ****************************/

var metricTcpV4ConnEstablished = "tcpv4connestablished";
var metricTcpV4ConnReset = "tcpv4connreset";
var metricTcpV4ConnFailures = "tcpv4connfailures";
var metricTcpV4ConnActive = "tcpv4connactive";
var metricTcpV4ConnPassive = "tcpv4connpassive";
var metricTcpV4SegmentsTotal = "tcpv4segments";
var metricTcpV4SegmentsSent = "tcpv4segmentssent";
var metricTcpV4SegmentsReceived = "tcpv4segmentsreceived";
var metricTcpV4SegmentsRetransmitted = "tcpv4segmentsretransmitted";
var metricsTcpV4Conn = [metricTcpV4ConnEstablished, metricTcpV4ConnReset, metricTcpV4ConnFailures];
var metricsTcpV4Segments = [metricTcpV4SegmentsSent, metricTcpV4SegmentsReceived, metricTcpV4SegmentsRetransmitted, metricTcpV4SegmentsTotal];

var metricTcpV6ConnEstablished = "tcpv6connestablished";
var metricTcpV6ConnReset = "tcpv6connreset";
var metricTcpV6ConnFailures = "tcpv6connfailures";
var metricTcpV6ConnActive = "tcpv6connactive";
var metricTcpV6ConnPassive = "tcpv6connpassive";
var metricTcpV6SegmentsTotal = "tcpv6segments";
var metricTcpV6SegmentsSent = "tcpv6segmentssent";
var metricTcpV6SegmentsReceived = "tcpv6segmentsreceived";
var metricTcpV6SegmentsRetransmitted = "tcpv6segmentsretransmitted";
var metricsTcpV6Conn = [metricTcpV6ConnEstablished, metricTcpV6ConnReset, metricTcpV6ConnFailures];
var metricsTcpV6Segments = [metricTcpV6SegmentsSent, metricTcpV6SegmentsReceived, metricTcpV6SegmentsRetransmitted, metricTcpV6SegmentsTotal];

var metricsTcpConnCumulative = [metricTcpV4ConnActive, metricTcpV4ConnPassive, metricTcpV6ConnActive, metricTcpV6ConnPassive];

var metricUdpV4DatagramsTotal = "udpv4datagrams";
var metricUdpV4DatagramsSent = "udpv4datagramssent";
var metricUdpV4DatagramsNoPort = "udpv4datagramsnoport";
var metricUdpV4DatagramsReceivedErrors = "udpv4datagramsreceivederrors";
var metricUdpV4DatagramsReceived = "udpv4datagramsreceived";
var metricsUdpV4 = [metricUdpV4DatagramsSent, metricUdpV4DatagramsReceived, metricUdpV4DatagramsNoPort, metricUdpV4DatagramsTotal];

var metricUdpV6DatagramsTotal = "udpv6datagrams";
var metricUdpV6DatagramsSent = "udpv6datagramssent";
var metricUdpV6DatagramsNoPort = "udpv6datagramsnoport";
var metricUdpV6DatagramsReceivedErrors = "udpv6datagramsreceivederrors";
var metricUdpV6DatagramsReceived = "udpv6datagramsreceived";
var metricsUdpV6 = [metricUdpV6DatagramsSent, metricUdpV6DatagramsReceived, metricUdpV6DatagramsNoPort, metricUdpV6DatagramsTotal];

var metricUdpDatagramsReceivedErrors = [metricUdpV4DatagramsReceivedErrors, metricUdpV6DatagramsReceivedErrors];

var metricIcmpV4MsgOutboundErrors = "icmpv4msgoutbounderrors";
var metricIcmpV4MsgReceivedErrors = "icmpv4msgreceivederrors";
var metricIcmpV4MsgSent = "icmpv4msgsent";
var metricIcmpV4MsgReceived = "icmpv4msgreceived";
var metricIcmpV4MsgTotal = "icmpv4msg";
var metricsIcmpV4Msg = [metricIcmpV4MsgSent, metricIcmpV4MsgReceived, metricIcmpV4MsgTotal];

var metricIcmpV6MsgOutboundErrors = "icmpv6msgoutbounderrors";
var metricIcmpV6MsgReceivedErrors = "icmpv6msgreceivederrors";
var metricIcmpV6MsgSent = "icmpv6msgsent";
var metricIcmpV6MsgReceived = "icmpv6msgreceived";
var metricIcmpV6MsgTotal = "icmpv6msg";
var metricsIcmpV6Msg = [metricIcmpV6MsgSent, metricIcmpV6MsgReceived, metricIcmpV6MsgTotal];

var metricsIcmpErrors = [metricIcmpV4MsgOutboundErrors, metricIcmpV4MsgReceivedErrors, metricIcmpV6MsgOutboundErrors, metricIcmpV6MsgReceivedErrors];

var metricsProtocol = metricsTcpV4Conn.concat(metricsTcpV4Segments).concat(metricsTcpV6Conn).concat(metricsTcpConnCumulative).concat(metricsTcpV6Segments);
metricsProtocol = metricsProtocol.concat(metricsUdpV4).concat(metricsUdpV6).concat(metricUdpDatagramsReceivedErrors);
metricsProtocol = metricsProtocol.concat(metricsIcmpV4Msg).concat(metricsIcmpV6Msg).concat(metricsIcmpErrors);

/*****************************
 * METRICS DISK              *
 ****************************/

var metricPhysicalDiskRead = "physicaldiskread";
var metricPhysicalDiskWrite = "physicaldiskwrite";
var metricPhysicalDiskTransfer = "physicaldisktransfer";
var metricsPhysicalDisk = [metricPhysicalDiskRead, metricPhysicalDiskWrite, metricPhysicalDiskTransfer];

var metricPhysicalDiskBytesRead = "physicaldiskbytesread";
var metricPhysicalDiskBytesWrite = "physicaldiskbyteswrite";
var metricPhysicalDiskBytesTotal = "physicaldiskbytes";
var metricsPhysicalDiskBytes = [metricPhysicalDiskBytesRead, metricPhysicalDiskBytesWrite, metricPhysicalDiskBytesTotal];

var metricPhysicalDiskTimeRead = "physicaldisktimeread";
var metricPhysicalDiskTimeWrite = "physicaldisktimewrite";
var metricPhysicalDiskTimeIdle = "physicaldisktimeidle";
var metricsPhysicalDiskTime = [metricPhysicalDiskTimeRead, metricPhysicalDiskTimeWrite, metricPhysicalDiskTimeIdle];

var metricPhysicalDiskQueueLengthRead = "physicaldiskqueuelengthread";
var metricPhysicalDiskQueueLengthWrite = "physicaldiskqueuelengthwrite";
var metricPhysicalDiskQueueLengthTotal = "physicaldiskqueuelength";
var metricsPhysicalDiskQueueLength = [metricPhysicalDiskQueueLengthRead, metricPhysicalDiskQueueLengthWrite, metricPhysicalDiskQueueLengthTotal];

var metricsDisk = metricsPhysicalDisk.concat(metricsPhysicalDiskBytes).concat(metricsPhysicalDiskTime).concat(metricsPhysicalDiskQueueLength);

/*****************************
 * METRICS NETWORK           *
 ****************************/
var metricNetworkIpV4DatagramsSent = "ipv4datagramssent";
var metricNetworkIpV4DatagramsReceived = "ipv4datagramsreceived";
var metricNetworkIpV4DatagramsForwarded = "ipv4datagramsforwarded";
var metricNetworkIpV4DatagramsTotal = "ipv4datagrams";
var metricsNetworkIpV4Datagrams = [metricNetworkIpV4DatagramsSent, metricNetworkIpV4DatagramsReceived, metricNetworkIpV4DatagramsForwarded, metricNetworkIpV4DatagramsTotal];

var metricNetworkIpV4FragmentsCreated = "ipv4fragmentscreated";
var metricNetworkIpV4FragmentsReassembled = "ipv4fragmentsreassembled";
var metricNetworkIpV4FragmentsReceived = "ipv4fragmentsreceived";
var metricsNetworkIpV4Fragments = [metricNetworkIpV4FragmentsCreated, metricNetworkIpV4FragmentsReassembled, metricNetworkIpV4FragmentsReceived];

var metricNetworkIpV6DatagramsSent = "ipv6datagramssent";
var metricNetworkIpV6DatagramsReceived = "ipv6datagramsreceived";
var metricNetworkIpV6DatagramsForwarded = "ipv6datagramsforwarded";
var metricNetworkIpV6DatagramsTotal = "ipv6datagrams";
var metricsNetworkIpV6Datagrams = [metricNetworkIpV6DatagramsSent, metricNetworkIpV6DatagramsReceived, metricNetworkIpV6DatagramsForwarded, metricNetworkIpV6DatagramsTotal];

var metricNetworkIpV6FragmentsCreated = "ipv6fragmentscreated";
var metricNetworkIpV6FragmentsReassembled = "ipv6fragmentsreassembled";
var metricNetworkIpV6FragmentsReceived = "ipv6fragmentsreceived";
var metricsNetworkIpV6Fragments = [metricNetworkIpV6FragmentsCreated, metricNetworkIpV6FragmentsReassembled, metricNetworkIpV6FragmentsReceived];

var metricsNetwork = metricsNetworkIpV4Datagrams.concat(metricsNetworkIpV4Fragments).concat(metricsNetworkIpV6Datagrams).concat(metricsNetworkIpV6Fragments);

/*****************************
 * METRICS HELPER FOR CHARTS *
 ****************************/

//Aggregation indexes in statistics array return by NSI api
var aggTimestamp = 0;
var aggNb = 1;
var aggLast = 2;
var aggMin = 3;
var aggMax = 4;
var aggSum = 5;
var aggAvg = 6;

//Function which return a serie title for a metric
function metricSerieTitle(metric) {
  var serieTitle = "";
  switch (metric) {
    case metricSystemCpu:
      serieTitle = "% Processor Time";
      break;
    case metricSystemMemory:
      serieTitle = "% Committed Bytes In Use";
      break;
    case metricSystemCalls:
      serieTitle = "System Calls/sec";
      break;
    case metricSystemException:
      serieTitle = "Exception Dispatches/sec";
      break;
    case metricSystemProcesses:
      serieTitle = "Processes";
      break;
    case metricSystemThreads:
      serieTitle = "Threads";
      break;
    case metricTcpV4ConnEstablished:
    case metricTcpV6ConnEstablished:
      serieTitle = "Established";
      break;
    case metricTcpV4ConnReset:
    case metricTcpV6ConnReset:
      serieTitle = "Reset";
      break;
    case metricTcpV4ConnFailures:
    case metricTcpV6ConnFailures:
      serieTitle = "Failure";
      break;
    case metricTcpV4ConnActive:
      serieTitle = "TCPv4 Active";
      break;
    case metricTcpV4ConnPassive:
      serieTitle = "TCPv4 Passive";
      break;
    case metricTcpV6ConnActive:
      serieTitle = "TCPv6 Active";
      break;
    case metricTcpV6ConnPassive:
      serieTitle = "TCPv6 Passive";
      break;
    case metricTcpV4SegmentsSent:
    case metricTcpV6SegmentsSent:
    case metricUdpV4DatagramsSent:
    case metricUdpV6DatagramsSent:
    case metricIcmpV4MsgSent:
    case metricIcmpV6MsgSent:
    case metricNetworkIpV4DatagramsSent:
    case metricNetworkIpV6DatagramsSent:
      serieTitle = "Sent";
      break;
    case metricTcpV4SegmentsReceived:
    case metricTcpV6SegmentsReceived:
    case metricUdpV4DatagramsReceived:
    case metricUdpV6DatagramsReceived:
    case metricIcmpV4MsgReceived:
    case metricIcmpV6MsgReceived:
    case metricNetworkIpV4DatagramsReceived:
    case metricNetworkIpV6DatagramsReceived:
    case metricNetworkIpV4FragmentsReceived:
    case metricNetworkIpV6FragmentsReceived:
      serieTitle = "Received";
      break;
    case metricNetworkIpV4DatagramsForwarded:
    case metricNetworkIpV6DatagramsForwarded:
      serieTitle = "Forwarded";
      break;
    case metricNetworkIpV4FragmentsCreated:
    case metricNetworkIpV6FragmentsCreated:
      serieTitle = "Created";
      break;
    case metricNetworkIpV4FragmentsReassembled:
    case metricNetworkIpV6FragmentsReassembled:
      serieTitle = "Reassembled";
      break;
    case metricTcpV4SegmentsRetransmitted:
    case metricTcpV6SegmentsRetransmitted:
      serieTitle = "Retransmitted";
      break;
    case metricUdpV4DatagramsNoPort:
    case metricUdpV6DatagramsNoPort:
      serieTitle = "No Port";
      break;
    case metricUdpV4DatagramsReceivedErrors:
      serieTitle = "UDPv4 Errors";
      break;
    case metricUdpV6DatagramsReceivedErrors:
      serieTitle = "UDPv6 Errors";
      break;
    case metricIcmpV4MsgOutboundErrors:
      serieTitle = "ICMPv4 Outbound Errors";
      break;
    case metricIcmpV4MsgReceivedErrors:
      serieTitle = "ICMPv4 Received Errors";
      break;
    case metricIcmpV6MsgOutboundErrors:
      serieTitle = "ICMPv6 Outbound Errors";
      break;
    case metricIcmpV6MsgReceivedErrors:
      serieTitle = "ICMPv6 Received Errors";
      break;
    case metricPhysicalDiskTimeRead:
    case metricPhysicalDiskQueueLengthRead:
    case metricPhysicalDiskBytesRead:
    case metricPhysicalDiskRead:
      serieTitle = "Read";
      break;
    case metricPhysicalDiskTimeWrite:
    case metricPhysicalDiskQueueLengthWrite:
    case metricPhysicalDiskBytesWrite:
    case metricPhysicalDiskWrite:
      serieTitle = "Write";
      break;
    case metricPhysicalDiskTimeIdle:
      serieTitle = "Idle";
      break;
    case metricPhysicalDiskTransfer:
      serieTitle = "Transfer";
      break;
    case metricUdpV4DatagramsTotal:
    case metricUdpV6DatagramsTotal:
    case metricTcpV4SegmentsTotal:
    case metricTcpV6SegmentsTotal:
    case metricPhysicalDiskQueueLengthTotal:
    case metricPhysicalDiskBytesTotal:
    case metricIcmpV4MsgTotal:
    case metricIcmpV6MsgTotal:
    case metricNetworkIpV4DatagramsTotal:
    case metricNetworkIpV6DatagramsTotal:
      serieTitle = "Total";
      break;
  }

  return serieTitle;
}

//Function which returns series for metrics array
function getTimeSeries(data, metricsToUse, agg) {
  var series = [];
  try {
    for (i = 0; i < metricsToUse.length; i++) {
      var metricToUse = metricsToUse[i];
      var serie = {
        "name": metricSerieTitle(metricToUse),
        "data": []
      };
      $.each(data.timeline[metricToUse], function(idx, itm) {
        serie.data.push([itm[aggTimestamp] * 1000, itm[agg]]);
      });
      series.push(serie);
    }
  } catch (e) {
    console.error(e);
  }
  return series;
}


/*****************************
 * WRAPPER TO NETSYSINFO API *
 ****************************/

//Query NetSysInfo API Summary
function apiSummary(server, cb) {
  try {
    var url = apiUrl + '/' + server + '/summary.json';
    ajax(url, cb);
  } catch (e) {
    console.error(e);
  }
}

//Query NetSysInfo API Hardware
function apiHardware(server, cb) {
  try {
    var url = apiUrl + '/' + server + '/hardware.json';
    ajax(url, cb);
  } catch (e) {
    console.error(e);
  }
}

//Query NetSysInfo API Time
function apiTime(server, from, to, metrics, cb) {
  try {
    var url = apiUrl + '/' + server + '/time.json?from=' + from.format("YYYYMMDDHHmmss") + '&to=' + to.format("YYYYMMDDHHmmss") + '&metrics=' + metrics;
    ajax(url, cb);
  } catch (e) {
    console.error(e);
  }
}

/*****************************
 * HELPERS                   *
 ****************************/

//Function which retrieve json data asynchronously
function ajax(url, cb) {
  try {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        cache: false,
        dataType: 'json'
      })
      .done(function(data) {
        cb(data);
      })
      .fail(function() {
        cb({
          "error": "An error occured"
        });
      });
  } catch (e) {
    console.error(e);
  }
}

//Bytes formatting function
function formatBytes(a, b) {
  if (0 === a) return "0B";
  var c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + e[f];
}

//Function which return style to use for percent progressbar
function progressbarPercentStyle(percent) {
  var pgstyle = "bg-info";
  if (!percent) {
    return pgstyle;
  }
  if (percent > 90) {
    pgstyle = "bg-danger";
  } else if (percent > 75) {
    pgstyle = "bg-warning";
  }
  return pgstyle;
}

/*****************************
 * ERRORS                    *
 ****************************/

var timeoutError;

//Display errors
function showError(html) {
  $('#error').html(html);
  $('#error').removeClass("d-none");
  if (typeof(timeoutError) !== 'undefined') {
    clearTimeout(timeoutError);
  }
  timeoutError = setTimeout(function() {
    hideError();
  }, 5000);
}

//Hide errors
function hideError() {
  timeoutError = undefined;
  $('#error').addClass("d-none");
}

/*****************************
 * CALENDAR / TOOLTIP        *
 ****************************/
var calendarFrom = moment().startOf('minute').subtract(30, 'minute').milliseconds(0);
var calendarTo = moment().seconds(0).milliseconds(0);

function calendarInit() {
  $('#calendar').daterangepicker({
    "timePicker": true,
    "timePicker24Hour": true,
    ranges: {
      'Last 30 Minutes': [moment().startOf('minute').subtract(30, 'minute').milliseconds(0), moment().milliseconds(999)],
      'Last Hour': [moment().startOf('minute').subtract(1, 'hour').milliseconds(0), moment().milliseconds(999)],
      'Last 3 Hours': [moment().startOf('minute').subtract(3, 'hour').milliseconds(0), moment().milliseconds(999)],
      'Last 6 Hours': [moment().startOf('minute').subtract(6, 'hour').milliseconds(0), moment().milliseconds(999)],
      'Last 12 Hours': [moment().startOf('minute').subtract(12, 'hour').milliseconds(0), moment().milliseconds(999)],
      'Last 24 Hours': [moment().startOf('minute').subtract(24, 'hour').milliseconds(0), moment().milliseconds(999)],
      //'Today': [moment(), moment()],
      //'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      //'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      //'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      //'This Month': [moment().startOf('month'), moment().endOf('month')],
      //'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    "locale": {
      "format": "YYYY-MM-DD HH:mm:ss",
      "separator": " - ",
      "applyLabel": "Apply",
      "cancelLabel": "Cancel",
      "fromLabel": "From",
      "toLabel": "To",
      "customRangeLabel": "Custom",
      "weekLabel": "W",
      "daysOfWeek": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      "firstDay": 1
    },
    "startDate": calendarFrom,
    "endDate": calendarTo,
    "opens": "left"
  }, function(start, end, label) {
    calendarFrom = start;
    calendarTo = end;

    //We update actual content
    $('#navbarCollapse .menuLink.active').trigger('click');
    //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  });
}

//Calendar and Tooltips initialisation
calendarInit();
$('[data-toggle="tooltip"]').tooltip();

/*****************************
 * HIGHCHARTS                *
 ****************************/
//Global Highcharts options
Highcharts.setOptions({
  time: {
    useUTC: false
  },
  credits: {
    enabled: false
  },
});

//Function to draw time chart
function chartTime(id, yTitle, yMin, yMax, series) {
  var chart;
  try {
    var xMin = calendarFrom.clone().utc().unix() * 1000;
    var xMax = calendarTo.clone().utc().unix() * 1000;
    var $div = $('#' + id);
    if ($div.length === 0) {
      return chart;
    }
    if ($div.highcharts() && $div.highcharts().destroy && "function" === typeof($div.highcharts().destroy)) {
      $div.highcharts().destroy();
    }
    var opts = {
      title: {
        text: null
      },
      chart: {
        type: 'line',
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: yTitle
        }
      },
      plotOptions: {
        line: {
          stacking: null
        },
        series: {
          pointPadding: 0,
          connectNulls: false,
          groupPadding: 0.1,
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: series
    };
    if (typeof(xMin) !== 'undefined') {
      opts.xAxis.min = xMin;
    }
    if (typeof(xMax) !== 'undefined') {
      opts.xAxis.max = xMax;
    }
    if (typeof(yMin) !== 'undefined') {
      opts.yAxis.min = yMin;
    }
    if (typeof(yMax) !== 'undefined') {
      opts.yAxis.max = yMax;
    }

    chart = $div.highcharts(opts);
  } catch (e) {
    console.error(e);
  }
  return chart;
}

/*****************************
 * MENU EVENTS               *
 ****************************/
$('.menuLink').on('click', function(e) {
  //hide all containers
  $('.containernsi').addClass("d-none");
  $('.menuLink').removeClass('active');
  $(e.currentTarget).addClass('active').removeClass('d-none');
  var showCalendar = true;
  setTimeout(function() {
    if ($(e.currentTarget).is('#menuSummary')) {
      $('#containerSummary').removeClass('d-none');
      showCalendar = false;
      apiSummary(server, fillSummary);
    } else if ($(e.currentTarget).is('#menuSystem')) {
      $('#containerSystem').removeClass('d-none');
      apiTime(server, calendarFrom.clone().utc(), calendarTo.clone().utc(), metricsSystem.join(','), fillSystem);
    } else if ($(e.currentTarget).is('#menuDisk')) {
      $('#containerDisk').removeClass('d-none');
      apiTime(server, calendarFrom.clone().utc(), calendarTo.clone().utc(), metricsDisk.join(','), fillDisk);
    } else if ($(e.currentTarget).is('#menuNetwork')) {
      $('#containerNetwork').removeClass('d-none');
      apiTime(server, calendarFrom.clone().utc(), calendarTo.clone().utc(), metricsNetwork.join(','), fillNetwork);
    } else if ($(e.currentTarget).is('#menuProtocol')) {
      $('#containerProtocol').removeClass('d-none');
      apiTime(server, calendarFrom.clone().utc(), calendarTo.clone().utc(), metricsProtocol.join(','), fillProtocol);
    } else if ($(e.currentTarget).is('#menuHardware')) {
      $('#containerHardware').removeClass('d-none');
      showCalendar = false;
      apiHardware(server, fillHardware);
    }

    //display calendar if needed
    showCalendar === true ? $('#calendar').removeClass("d-none") : $('#calendar').addClass("d-none");
  }, 0);
  return false;
});

/*****************************
 * SUMMARY                   *
 ****************************/
//Function to fill Summary container
var fillSummary = function fillSummary(data) {
  try {
    if (data.error) {
      showError(data.error);
      return false;
    }

    var i;

    //Informations and Locales
    $('#serverName').html((data.computerAlias || data.computerName || "SERVER").toUpperCase());
    var props = ['computerName', 'computerAlias', 'hostName', 'ipLocal', 'osFullName', 'osPlatform', 'osVersion', 'timeBoot', 'timeGmt', 'timeLocal', 'timeUpdate', 'uiCulture', 'uptime'];
    for (i = 0; i < props.length; i++) {
      var prop = props[i];
      if (!data[prop]) {
        continue;
      }
      var v = data[prop];
      if (Array.isArray(v)) {
        v = v.join(', ');
      }
      $('#containerSummary #' + prop).html(v);
    }

    //Memory
    props = ['physicalMemoryFree', 'physicalMemoryTotal', 'physicalMemoryUsed', 'virtualMemoryFree', 'virtualMemoryTotal', 'virtualMemoryUsed'];
    for (i = 0; i < props.length; i++) {
      var prop = props[i];
      if (!data[prop]) {
        continue;
      }
      $('#containerSummary #' + prop).html(formatBytes(data[prop]));
    }
    props = ['virtualMemoryPercent', 'physicalMemoryPercent'];
    for (i = 0; i < props.length; i++) {
      var prop = props[i];
      if (!data[prop]) {
        continue;
      }
      $('#containerSummary #' + prop).css("width", data[prop] + "%");
      $('#containerSummary #' + prop).attr("aria-valuenow", data[prop]);
      $('#containerSummary #' + prop).removeClass("bg-info bg-warning bg-danger").addClass(progressbarPercentStyle(data[prop]));
    }

    //Logical Drives
    var trs = [];
    $.each(data.drivesLogical, function(idx, itm) {
      var pgStyle = progressbarPercentStyle(itm.spacePercent);
      var tr = [
        '<tr>',
        '  <td>' + itm.name + '</td>',
        '  <td width="100%">' + itm.volumeLabel + '</td>',
        '  <td class="text-center">' + itm.format + '</td>',
        '  <td class="text-center">' + itm.type + '</td>',
        '  <td class="width150">',
        '    <div class="progress m-1">',
        '      <div class="progress-bar ' + pgStyle + '" role="progressbar" style="width:' + itm.spacePercent + '%;" aria-valuenow="' + itm.spacePercent + '" aria-valuemin="0" aria-valuemax="100"></div>',
        '    </div>',
        '  </td>',
        '  <td class="text-right width100">' + formatBytes(itm.spaceFree) + '</td>',
        '  <td class="text-right width100">' + formatBytes(itm.spaceUsed) + '</td>',
        '  <td class="text-right width100">' + formatBytes(itm.totalSize) + '</td>',
        '</tr>'
      ];
      trs.push(tr.join(''));
    });
    $('#containerSummary #drivesLogical').html(trs.join(''));

    //Physical Drives
    trs = [];
    $.each(data.drivesPhysical, function(idx, itm) {
      var tr = [
        '<tr>',
        '  <td width="100%">' + itm.model + '</td>',
        '  <td class="text-center">' + itm.interfaceType + '</td>',
        '  <td class="text-center">' + itm.status + '</td>',
        '  <td class="text-right width100">' + formatBytes(itm.size) + '</td>',
        '</tr>'
      ];
      trs.push(tr.join(''));
    });
    $('#containerSummary #drivesPhysical').html(trs.join(''));

    //Interfaces
    trs = [];
    $.each(data.interfaces, function(idx, itm) {
      var tr = [
        '<tr>',
        '  <td width="100%">' + itm.name + '</td>',
        '  <td class="text-center">' + itm.type + '</td>',
        '  <td class="text-right width100">' + formatBytes(itm.speed) + '/s</td>',
        '  <td class="text-right width100">' + formatBytes(itm.bytesSent) + '</td>',
        '  <td class="text-right width100">' + formatBytes(itm.bytesReceived) + '</td>',
        '</tr>'
      ];
      trs.push(tr.join(''));
    });
    $('#containerSummary #interfaces').html(trs.join(''));

    //Processes
    trs = [];
    $.each(data.processes, function(idx, itm) {
      var tr = [
        '<tr>',
        '  <td>' + itm.name + ' (' + itm.pid + (typeof(itm.responding) !== 'undefined' && itm.responding === true ? '' : "*") + ')</td>',
        '  <td class="text-center">' + itm.priority + '</td>',
        '  <td class="text-right">' + (itm.cpu < 1 ? '<1' : itm.cpu) + '%</td>',
        '  <td class="text-right">' + formatBytes(itm.workingSet) + '</td>',
        '  <td class="text-right"><span class="color1">' + formatBytes(itm.procTimeUser) + '</span> / <span class="color2">' + formatBytes(itm.procTimePriviledged) + '</span> / <span class="color3">' + formatBytes(itm.procTimeTotal) + '</span></td>',
        '  <td class="text-right"><span class="color1">' + formatBytes(itm.memoryPrivate) + '</span> / <span class="color2">' + formatBytes(itm.memoryVirtual) + '</span> / <span class="color3">' + formatBytes(itm.memoryPaged) + '</span></td>',
        '  <td class="text-right"><span class="color1">' + formatBytes(itm.peakWorkingSet) + '</span> / <span class="color2">' + formatBytes(itm.peakVirtualMemory) + '</span> / <span class="color3">' + formatBytes(itm.peakPagedMemory) + '</span></td>',
        '  <td class="text-right"><span class="color1">' + formatBytes(itm.systemMemoryPaged) + '</span> / <span class="color2">' + formatBytes(itm.systemMemoryNonPaged) + '</span></td>',
        '  <td class="text-right">' + itm.threads + '</td>',
        '  <td class="text-right">' + itm.handles + '</td>',
        '</tr>'
      ];
      trs.push(tr.join(''));
    });
    $('#containerSummary #processes').html(trs.join(''));

  } catch (e) {
    console.error(e);
  }
};

/*****************************
 * HARDWARE                  *
 ****************************/
//Function to fill Hardware container
var fillHardware = function fillHardware(data) {
  try {
    if (data.error) {
      showError(data.error);
      return false;
    }

    var hardwareCategories = [
      "processor",
      "memory",
      "baseboard",
      "bios",
      "enclosure",
      "tapeDrive",
      "diskDrive",
      "diskPartition",
      "diskLogical",
      "networkAdapter",
      "networkClient",
      "networkConnection",
      "networkLoginProfile",
      "networkProtocol",
      "temperatureProbe",
      "voltageProbe",
      "cdrom",
      "printer",
      "keyboard",
      "infraredDevice",
      "pointingDevice",
      "soundDevice",
      "serialPort",
      "ideController",
      "scsiController",
      "usbController",
      "videoController"
    ];

    var jstreedata = [];
    for (var j = 0; j < hardwareCategories.length; j++) {
      var category = hardwareCategories[j];
      var children = [];
      for (var i = 0; i < data[category].length; i++) {
        children.push({
          "text": data[category][i].name,
          "icon": false,
          "data": data[category][i]
        });
      }

      var o = {
        "text": category,
        "icon": "images/" + category + ".png",
        "children": children
      };
      if (children.length === 0) {
        o.state = {
          "disabled": true
        };
      }
      jstreedata.push(o);
    }

    //Init jsTree
    $('#jstreeHardware').jstree({
      'core': {
        'data': jstreedata
      }
    });

    //Handle jsTree selection
    $('#jstreeHardware').off('changed.jstree').on('changed.jstree', function(e, data) {
      if (data.selected.length <= 0) {
        return false;
      }
      var node = data.instance.get_node(data.selected[0]);
      if (!node.data) {
        return false;
      }
      $('#hardwaretitle').html(node.data.name);
      var trs = [];
      for (var i = 0; i < node.data.properties.length; i++) {
        trs.push('<tr><td style="width:auto;">' + node.data.properties[i].k + '</td><td style="width:100%;">' + node.data.properties[i].v + '</td></tr>');
      }
      $('#hardwareprops').html(trs.join(''));
    });

  } catch (e) {
    console.error(e);
  }
};

/*****************************
 * SYSTEM                   *
 ****************************/
var fillSystem = function fillSystem(data) {
  if (data.error) {
    showError(data.error);
    return false;
  }

  for (var i = 0; i < metricsSystem.length; i++) {
    var yMin = 0;
    var yMax = null;
    var min = {
      "name": "Min",
      "data": []
    };
    var max = {
      "name": "Max",
      "data": []
    };
    var avg = {
      "name": "Avg",
      "data": []
    };

    var metricToUse = metricsSystem[i];
    switch (metricToUse) {
      case metricSystemCpu:
        yMax = 100;
        break;
      case metricSystemMemory:
        yMax = 100;
        break;
    }
    $.each(data.timeline[metricToUse], function(idx, itm) {
      var tmpTimestamp = itm[aggTimestamp] * 1000;
      min.data.push([tmpTimestamp, itm[aggMin]]);
      max.data.push([tmpTimestamp, itm[aggMax]]);
      avg.data.push([tmpTimestamp, itm[aggAvg]]);
    });
    var series = [min, avg, max];
    chartTime("chart" + metricToUse, metricSerieTitle(metricToUse), yMin, yMax, series);
  }
};

/*****************************
 * PROTOCOL                  *
 ****************************/
var fillProtocol = function fillProtocol(data) {
  if (data.error) {
    showError(data.error);
    return false;
  }
  var yMin = 0;
  var yMax = null;
  var series = [];
  for (var j = 0; j < 2; j++) {
    //TCP Connections
    series = getTimeSeries(data, (j === 0 ? metricsTcpV4Conn : metricsTcpV6Conn), aggMax);
    chartTime((j === 0 ? "charttcpv4conn" : "charttcpv6conn"), (j === 0 ? "TCPv4" : "TCPv6") + " Connections", yMin, yMax, series);

    //TCP Segments
    series = getTimeSeries(data, (j === 0 ? metricsTcpV4Segments : metricsTcpV6Segments), aggMax);
    chartTime((j === 0 ? "charttcpv4segments" : "charttcpv6segments"), (j === 0 ? "TCPv4" : "TCPv6") + " Max Segments/sec", yMin, yMax, series);

    //UDP Datagrams
    series = getTimeSeries(data, (j === 0 ? metricsUdpV4 : metricsUdpV6), aggMax);
    chartTime((j === 0 ? "chartudpv4datagrams" : "chartudpv6datagrams"), (j === 0 ? "UDPv4" : "UDPv6") + " Max Datagrams/sec", yMin, yMax, series);

    //ICMP Messages
    series = getTimeSeries(data, (j === 0 ? metricsIcmpV4Msg : metricsIcmpV4Msg), aggMax);
    chartTime((j === 0 ? "charticmpv4messages" : "charticmpv6messages"), (j === 0 ? "ICMPv4" : "ICMPv6") + " Max Messages/sec", yMin, yMax, series);
  }

  //TCP Cumulative Connections
  series = getTimeSeries(data, metricsTcpConnCumulative, aggMax);
  chartTime("charttcpconncumulative", "TCP Cumulative Connections", yMin, yMax, series);

  //UDP Received Errors
  series = getTimeSeries(data, metricUdpDatagramsReceivedErrors, aggMax);
  chartTime("chartudpdatagramsreceivederrors", "UDP Max Datagrams Received Errors", yMin, yMax, series);

  //ICMP Errors
  series = getTimeSeries(data, metricsIcmpErrors, aggMax);
  chartTime("charticmperrors", "ICMP Max Errors", yMin, yMax, series);
};

/*****************************
 * DISK                      *
 ****************************/
var fillDisk = function fillDisk(data) {
  if (data.error) {
    showError(data.error);
    return false;
  }

  var yMin = 0;
  var yMax = null;
  var series = [];

  //Operations
  series = getTimeSeries(data, metricsPhysicalDisk, aggMax);
  chartTime("chartdiskoperations", "Max Operations/sec", yMin, yMax, series);

  //Transfer
  series = getTimeSeries(data, metricsPhysicalDiskBytes, aggMax);
  chartTime("chartdisktransfer", "Max Bytes/sec", yMin, yMax, series);

  //QueueLength
  series = getTimeSeries(data, metricsPhysicalDiskQueueLength, aggMax);
  chartTime("chartdiskqueuelength", "Max Queue Length", yMin, yMax, series);

  //Time
  series = getTimeSeries(data, metricsPhysicalDiskTime, aggMax);
  chartTime("chartdisktime", "% Time", yMin, 100, series);
};

/*****************************
 * DISK                      *
 ****************************/
var fillNetwork = function fillNetwork(data) {
  if (data.error) {
    showError(data.error);
    return false;
  }
  var yMin = 0;
  var yMax = null;
  var series = [];
  for (var j = 0; j < 2; j++) {
    //IP Datagrams
    series = getTimeSeries(data, (j === 0 ? metricsNetworkIpV4Datagrams : metricsNetworkIpV6Datagrams), aggMax);
    chartTime((j === 0 ? "chartnetworkipv4datagrams" : "chartnetworkipv6datagrams"), (j === 0 ? "IPv4" : "IPv6") + " Datagrams/sec", yMin, yMax, series);

    //IP Fragments
    series = getTimeSeries(data, (j === 0 ? metricsNetworkIpV4Fragments : metricsNetworkIpV6Fragments), aggMax);
    chartTime((j === 0 ? "chartnetworkipv4fragments" : "chartnetworkipv6fragments"), (j === 0 ? "IPv4" : "IPv6") + " Fragments/sec", yMin, yMax, series);
  }
};

/*****************************
 * STARTER                   *
 ****************************/

//We retrieve the server id
if (window.location.search && window.location.search.length === 40) {
  var regexServerId = /\?((([A-F0-9]{4})-){7}([A-F0-9]{4}))/ig;
  var match = regexServerId.exec(window.location.search);
  if (match !== null) {
    server = window.location.search.substring(1);
  }
}

if (server) {
  $('#menu').removeClass("d-none");
  $('#main').removeClass("d-none");
  $('#menuSummary').trigger('click');
} else {
  $('#selectserver').removeClass("d-none");
  $('#btServer').on('click', function() {
    window.location = [window.location.origin, "/?", $('#inputServer').val()].join('');
  });
}