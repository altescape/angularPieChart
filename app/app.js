(function () {
  'use strict';

  var app = angular.module('examples', ['chart.js']);

  app.directive('chartDoughnutAlt', function (ChartJsFactory) { 
    
    Chart.types.Doughnut.extend({
      name: "DoughnutAlt",
      draw: function() {
        Chart.types.Doughnut.prototype.draw.apply(this, arguments);
        
        // Segment labels        
        this.chart.ctx.textAlign = 'center';
        this.chart.ctx.textBaseline = 'middle';
        this.chart.ctx.fillStyle = '#FFF';
        this.chart.ctx.font = 'bold 10px Helvetica';

        var radius = -this.chart.height;
        var x = this.chart.width / 2; 
        var y = this.chart.height / 2; 
        var total_benefits = 0;
        var lradius = radius / 2.5;

        angular.forEach(this.segments, function (value, key) {
          console.log(value);
          if (value.circumference > 0.15) {
            var dx = lradius * Math.cos(value.startAngle + value.circumference / 2 + Math.PI) + x;
            var dy = lradius * Math.sin(value.startAngle + value.circumference / 2 + Math.PI) + y;

            // Segment, Text & Shadow 
            this.chart.ctx.shadowColor = 'rgba(0,0,0,0.5)';
            this.chart.ctx.shadowBlur = 3;
            this.chart.ctx.shadowOffsetX = 1;
            this.chart.ctx.shadowOffsetY = 1;
            this.chart.ctx.fontWeight = 'bold';
            this.chart.ctx.fillStyle = 'rgba(255,255,255,0.8)';
            this.chart.ctx.fillText(value.value.toFixed(1), dx, dy);

            total_benefits += value.value; 
          }
        }, this);

        // Reset shadow
        this.chart.ctx.shadowColor = 'rgba(0,0,0,0)';
        this.chart.ctx.shadowBlur = 0;
        this.chart.ctx.shadowOffsetX = 0;
        this.chart.ctx.shadowOffsetY = 0;

        // Center label
        this.chart.ctx.font = 'normal 12px Helvetica';
        this.chart.ctx.fontWeight = 'normal';
        this.chart.ctx.fillStyle = '#AAA';
        this.chart.ctx.fillText('TOTAL BENEFITS', x, y-5);
        this.chart.ctx.fillStyle = '#666';
        this.chart.ctx.fillText(total_benefits.toFixed(1) + "M", x, y+8);
      }
    });

    return new ChartJsFactory('DoughnutAlt');
  });

  app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      animation: true,
      animationSteps: 30,
      animationEasing: 'easeInOutQuint',
      colours: ['#c66119', '#c61954', '#b657bb', '#42589d', '#808122', '#3e2047', '#2886a9', '#7b241f', '#c1a735', '#213a3f'],
      responsive: true,
      showTooltips: false
    });

    // Configure all doughnut charts
    ChartJsProvider.setOptions('DoughnutAlt', {
      animateScale: false,
      percentageInnerCutout: 60
    });

  });

  app.controller('DoughnutCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.doughnut_data = [
      {
        value: 0,
        color: '#c66119',
        label: 'Airfare Insight - Cost'
      },
      {
        value: 0,
        color: '#c61954',
        label: 'Airfare Insight - Revenue'
      },
      {
        value: 0,
        color: '#b657bb',
        label: 'ARR' 
      },
      {
        value: 0,
        color: '#42589d',
        label: 'Bundled Network'
      },
      {
        value: 0,
        color: '#808122',
        label: 'Channel Shift'
      },
      {
        value: 0,
        color: '#3e2047',
        label: 'Horizon Service Fees/EMD'
      },
      {
        value: 0,
        color: '#2886a9',
        label: 'Real Time Revenue Integrity'
      },
      {
        value: 0,
        color: '#7b241f',
        label: 'Revenue Integrity'
      },
      {
        value: 0,
        color: '#c1a735',
        label: 'W&B Central Load Control'
      },
      {
        value: 0,
        color: '#213a3f',
        label: 'W&B CMAP'
      }
    ];

    var get_data =  function (data) {
      var data_array = [];
      var label_array = [];
      var colors_array = [];
      angular.forEach(data, function (value, key) {
        if (!isNaN(value.value)) {
          data_array.push(value.value);
          label_array.push(value.label);
          colors_array.push(value.color);
        }
      });
      $scope.data = data_array;
      $scope.labels = label_array;
    };


    $scope.update_chart = function() {
      get_data($scope.doughnut_data);
    };

  }]);
})();
