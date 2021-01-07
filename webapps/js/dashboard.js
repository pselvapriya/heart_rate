$(()=>{
    var queryParams={
        "aggs" : {
            "activity": {
               "terms": {
                  "field": "activity"
               }
            }  
         }
        
    }
        $.ajax({
            "dataType":'json',
            "contentType": "application/json",
            "type": "POST",
            "url": BASE_PATH + "/patientstatus/list",
            "data":JSON.stringify({"query": queryParams}),
            success: function(data) {
                var resultData = data.result.aggregations.activity.buckets;
                console.log("hello----", resultData);
                // console.log( resultData.buckets[0].avg_hr);
                var activitys=[]; 
                // resultData.forEach(element => {
                //     activitys= element.doc_count ;
                // console.log(element.doc_count);

                // })
                for(var i=0;i<=resultData.length-1;i++){
                console.log(resultData[i]);
                // activitys= resultData[i];
                activitys.push({"value":resultData[i].doc_count,"name":resultData[i].key})
                }
                console.log(activitys);

                var myChart = echarts.init(document.querySelector('#chart'));
                option = {
                backgroundColor: '#ffffff',
              
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
              
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: 'Activity',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: activitys.sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            color: 'rgb(54, 54, 54)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgb(54, 54, 54)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                           color: '#d63a34',
                            
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
              
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
              };
              myChart.setOption(option);
            },
        });
    });
    
    
    //piechart
    $(()=>{
        var queryParams={"aggregations": {
            "ages_range": {
              "range": {
                        "field":"age",
                        "ranges": [
                            {"key":"1-10","from": 1, "to": 11 },
                            {"key":"10-20","from": 11, "to": 21 },
                            {"key":"21-30","from": 21, "to": 31 },
                            {"key":"31-40","from": 31, "to": 41 },
                            {"key":"41-50","from": 41, "to": 51 },
                            {"key":"51-60","from": 51, "to": 61 },
                            {"key":"61-70","from": 61, "to": 71 },
                            {"key":"71-80","from": 71, "to": 81 },
                            {"key":"81-90","from": 81, "to": 91 },
                            {"key":"91-100","from": 91, "to": 101}
                        ]
                     }
                     
               }
            
         }
}       
        
            $.ajax({
                "dataType":'json',
                "contentType": "application/json",
                "type": "POST",
                "url": BASE_PATH + "/patientstatus/list",
                "data":JSON.stringify({"query": queryParams}),
                success: function(data) {
                    console.log(data);
                    var resultData = data.result.aggregations.ages_range.buckets;
                    //  console.log("halooolooo", resultData);
                    var adges=[];
                    for(var i=0;i<=resultData.length-1;i++){
                        console.log(resultData[i]);
                        // adges= resultData[i];
                        adges.push({"value":resultData[i].doc_count,"name":resultData[i].key})
                        }
                        console.log("age",adges);
        
                  
       
    
      var myChart = echarts.init(document.querySelector('#age'));
      option = {
        //   backgroundColor: '#fff',
        title: {
            text: '',
            subtext: '',
            left:'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: [ resultData.buckets[0].key,
        //     resultData.buckets[1].key,
        //     resultData.buckets[2].key,
        //     resultData.buckets[3].key,
        //     resultData.buckets[4].key,
        //     resultData.buckets[5].key,
        //     resultData.buckets[6].key,
        //     resultData.buckets[7].key,
        //     resultData.buckets[8].key,]
        // },
       
        series: [
            {
                
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:adges,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0
                        // shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
     myChart.setOption(option);
    },
    });
    })
    
    //Barchart
    
    $(()=>{
        var queryParams={
            
                "aggregations": {
                   "city": {
                      "terms": {
                         "field": "city"
                      }
                   }
                }
             }
             $.ajax({
                 "dataType":"json",
                 "contentType":"application/json",
                 "type":"post",
                 "url":BASE_PATH + "/patient/list",
                 "data":JSON.stringify({"query":queryParams}),
                 success:function(data){
                     console.log( "city",data);
                     var resultData=data.result.aggregations.city.buckets;
                     console.log("city1",resultData);
                    var cityss=[];
                    var cityname=[];
                    for(i=0;i<=resultData.length-1;i++)
                    {
                        // console.log("city2",resultData[i]);
                        cityss.push(resultData[i].doc_count)
                        cityname.push(resultData[i].key)


                    }
                    console.log("city3",cityss);
                    console.log("city3",cityname); 
                    var myChart = echarts.init(document.getElementById('totalpatients'));
                
                    option = {
                        
                        xAxis: {
                            type: 'category',
                            data:cityname ,
                            axisLabel: {
                                interval: 0,
                                rotate: 30 //If the label names are too long you can manage this by rotating the label.
                              }
                            
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: cityss,
                            type: 'bar',
                            color:'rgb(113, 199, 233)',
                        // datapoints:cityss
                        }]
                        // Chart.render()
                    };
                    console.log("chartdata",option);
                    
                    myChart.setOption(option); 
                 }

             })
             
    
    
    
    
    });
    //linechart
    $(()=>{
        var queryParams={
            "aggs" : {
                "activity": {
                   "terms": {
                      "field": "activity"
                   }
                }  
             }
            
        }
            $.ajax({
                "dataType":'json',
                "contentType": "application/json",
                "type": "POST",
                "url": BASE_PATH + "/patientstatus/list",
                "data":JSON.stringify({"query": queryParams}),
                success: function(data) {
                    var resultData = data.result.aggregations.activity.buckets;
                    console.log("hello----", resultData);
                    // console.log( resultData.buckets[0].avg_hr);
                    var activitys=[]; 
                    // resultData.forEach(element => {
                    //     activitys= element.doc_count ;
                    // console.log(element.doc_count);
    
                    // })
                    for(var i=0;i<=resultData.length-1;i++){
                    console.log(resultData[i]);
                    // activitys= resultData[i];
                    activitys.push({"value":resultData[i].doc_count,"name":resultData[i].key})
                    }
                    console.log(activitys);var myChart = echarts.init(document.querySelector('#heartchart'));
                    var echartdata = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60],["2000-07-25",44],["2000-07-26",127],["2000-07-27",114],["2000-07-28",86],["2000-07-29",73],["2000-07-30",52],["2000-07-31",69],["2000-08-01",86],["2000-08-02",118],["2000-08-03",56],["2000-08-04",91],["2000-08-05",121],["2000-08-06",127],["2000-08-07",78],["2000-08-08",79],["2000-08-09",46],["2000-08-10",108],["2000-08-11",80],["2000-08-12",79],["2000-08-13",69],["2000-08-14",80],["2000-08-15",105],["2000-08-16",119],["2000-08-17",105],["2000-08-18",55],["2000-08-19",74],["2000-08-20",41],["2000-08-21",62],["2000-08-22",104],["2000-08-23",118],["2000-08-24",121],["2000-08-25",126],["2000-08-26",99],["2000-08-27",92],["2000-08-28",75],["2000-08-29",91],["2000-08-30",94],["2000-08-31",69],["2000-09-01",93],["2004-07-25",78],["2004-07-26",78],["2004-07-27",59],["2004-07-28",111],["2004-07-29",78],["2004-07-30",30],["2004-07-31",78],["2004-08-01",91],["2004-08-02",119],["2004-08-03",95],["2004-08-04",73],["2004-08-05",76],["2004-08-06",89],["2004-08-07",117],["2004-08-08",145],["2004-08-09",143],["2004-08-10",84],["2004-08-11",84],["2004-08-12",51],["2004-08-13",31],["2007-03-13",133]];
                    
                    myChart.setOption({
                    title: {
                        text: 'Heartrate(BPM)',
                        size:'2px',
                        fontweight:'bolder'
                        
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: echartdata.map(function (item) {
                            return item[0];
                        })
                    },
                    yAxis: {
                         splitLine: {
                            show: false
                        },
                    },
                    toolbox: {
                        left: 'center',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: '2014-06-01'
                    }, {
                        type: 'inside'
                    }],
                    visualMap: {
                            top: 10,
                            right: 10,
                            pieces: [{
                                gt: 0,
                                lte: 50,
                                color: '#d63a34'
                            }, {
                                gt: 50,
                                lte: 100,
                                color: '#d63a34'
                            }, {
                                gt: 100,
                                lte: 150,
                                color: '#d63a34'
                            }, {
                                gt: 150,
                                lte: 200,
                                color: '#d63a34'
                            }, {
                                gt: 200,
                                color: '#d63a34'
                            
                            }],
                            outOfRange: {
                                color: '#d63a34'
                            }
                        },
                      
                    
                    
                    series:{
                            markPoint: {
                                data: [
                                    {type: 'max', name: ''},
                                    {type: 'min', name: ''}
                                ]
                            },
                            color:{
                                colorstops:[
                                    {
                                        offset:1,color:'red'//color at 100% position
                                    }],
                                    gobal:false//false by default
                                },
                                    
                            
                            
                        
                        name: 'Heartrate Analysis',
                        type: 'line',
                        data: echartdata.map(function (item) {
                            return item[1];
                        }),
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 50,lineStyle:{color: '#d63a34'}
                                
                            }, {
                                yAxis: 100,
                                color: '#d63a34'
                            }, {
                                yAxis: 150,
                                color: '#d63a34'
                            }, {
                                yAxis: 200,
                                color: '#d63a34'
                            
                            }],
                            outOfRange: {
                                color: '#d63a34'
                            }
                        }
                    },
                    });
                },
            });
        });
        
    
    //linechart end
    $(()=>{
        // var queryParams{}
        
    
    
    })
    
    //calendar
    $(function() {
    
        var start = moment().subtract(29, 'days');
        var end = moment();
    
        function cb(start, end) {
            $('#reportrange span').html(start.format('MMM D,YYYY') + ' - ' + end.format('MMM D,YYYY'));
        }
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);
    
        cb(start, end);
    
    }); 
    //barchart1
    $(()=>{
        var queryParams={
             
            "aggregations": {
               "genders": {
                  "terms": {
                     "field": "gender"
                  }
               }
            }
         }
         $.ajax({
            "dataType":'json',
            "contentType": "application/json",
            "type": "POST",
            "url": BASE_PATH + "/patientstatus/list",
            "data":JSON.stringify({"query": queryParams}),
            success: function(data) {
                console.log(data);
                var resultData = data.result.aggregations.genders.buckets;
                console.log("barchart",resultData);
                var barcharts=[];
                var gen=[];
                
                for(var i=0;i<=resultData.length-1;i++){
                    console.log(resultData[i]);
                    barcharts.push(resultData[i].doc_count)
                    gen.push(resultData[i].key)
                    }
                console.log("gender",barcharts);
    
    var myChart = echarts.init(document.querySelector('#barchart1'));
    option = {
        
        xAxis: {
            type: 'category',
            data:gen,
            axisLabel:{
                interval:0,
                rotate:40
            }
            // data:[barcharts]
        },
        yAxis: {
            // data:barcharts
            
            
        },
        series: [{
            data:barcharts,
            // data: [resultData.buckets[0].doc_count, resultData.buckets[1].doc_count],
            type: 'bar',
            color:'rgb(56, 141, 175)'
        }]
        
    };
    myChart.setOption(option);
            },
        })
    
    });
    
    //barchart2
    $(()=>{
    var myChart = echarts.init(document.querySelector('#barchart2'));
    option = {
        xAxis: {
            type: 'category',
            data: ['active', 'inactive'],
            axisLabel:{
                interval:0,
                rotate:30
            }
        },
     
        yAxis: {
            type: 'value',
            axisline:{
                show:"true"
            }
        },
        series: [{
            data: [120, 200],
            type: 'bar',
            color:'rgb(185, 56, 56)'
        }]
    };
    
    myChart.setOption(option);
    });
    var elem = document.documentElement;
        /* View in fullscreen */
        function dashboardexpand() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        }
    
        /* Close fullscreen */
        function closeFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    
    //reload fuction
        // function reload() {
        //     loadPatientstatusList();
        // }
    //  normal===================
    $(()=>{
        var queryParams={
            "query": {
              "script": {
                "script": {
                  "inline": "doc['heart_rate'].value > 120 || doc['heart_rate'].value < 60",
                  "lang": "painless"
                }
              }
            
          },
                 "sort": [
                 
                  { "reported_ts": { "order": "desc" }}
              ],
              "size": 5
          } 
         $.ajax({
            "dataType":'json',
            "contentType": "application/json",
            "type": "POST",
            "url": BASE_PATH + "/patientstatus/list",
            "data":JSON.stringify({"query": queryParams}),
            success: function(data) {
                console.log("normal",data);
                var resultData = data.result.data.data;  
    console.log(resultData[0].heart_rate)
    for(var i=0;i<=resultData.length-1;i++){
    $("#info").append(` <li>
    <h5 class="name"> `+ resultData[i].patient_name +`
        <i class="fa fa-eye" aria-hidden="true"></i>
    </h5>
</li>
<li>
`+ resultData[i].gender +`,`+ resultData[i].age +` Years old
</li>
<li>
`+ resultData[i].address +`
</li>
<li>
    <button class="action">`+ resultData[i].activity +`</button>
</li>`)
$("#patientstatus").append(`
<h5 class="rate">`+resultData[i].heart_rate+` &nbsp;<span class="parameter">BPM</span> &nbsp;<span
class="empty">_</span></h5>
<span class="time"><i class="fa fa-clock-o" aria-hidden="true"></i> 
`+resultData[i].reported_ts+`</span>`)}

            },
        })
    
    });