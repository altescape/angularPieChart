(function () {
  'use strict';

  var app = angular.module('examples', ['chart.js']);

  app.directive('chartDoughnutAlt', function (ChartJsFactory) { 
    
    Chart.types.Doughnut.extend({
      name: "DoughnutAlt",
      draw: function() {
        Chart.types.Doughnut.prototype.draw.apply(this, arguments);
        
        this.chart.ctx.textAlign = 'center';
        this.chart.ctx.textBaseline = 'middle';
        this.chart.ctx.fillStyle = '#FFF';
        this.chart.ctx.fontWeight = 'bold';

        var radius = -this.chart.height;
        var x = this.chart.width / 2; 
        var y = this.chart.height / 2; 
        var total_benefits = 0;

        var lradius = radius / 2.5;
        for(var i = 0, segments = this.segments; i < segments.length; i++) {
          if (segments[i].value > 0) {
            var dx = lradius * Math.cos(segments[i].endAngle + segments[i].circumference / 2 + Math.PI) + x;
            var dy = lradius * Math.sin(segments[i].endAngle + segments[i].circumference / 2 + Math.PI) + y;
            this.chart.ctx.fillText(segments[i].value, dx, dy);
            total_benefits += segments[i].value;
          }
        }

        // Center label
        this.chart.ctx.fontWeight = 'normal';
        this.chart.ctx.fillStyle = '#AAA';
        this.chart.ctx.fillText('TOTAL BENEFITS', x, y-5);
        this.chart.ctx.fillStyle = '#666';
        this.chart.ctx.fillText(total_benefits + "M", x, y+5);
      }
    });

    return new ChartJsFactory('DoughnutAlt'); });

  app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      animation: false,
      animationSteps: 10,
      animationEasing: 'easeInOutQuad',
      colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#FC0', '#C50AFA', '#F210CD'],
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
    $scope.labels = [
      'Airfare Insight - Cost', 
      'Airfare Insight - Revenue', 
      'ARR', 
      'Bundled Network', 
      'Channel Shift', 
      'Horizon Service Fees/EMD', 
      'Real Time Revenue Integrity', 
      'Revenue Integrity', 
      'W&B Central Load Control', 
      'W&B CMAP', 
    ];

    $scope.nums = {};
    $scope.nums.inp1 = $scope.nums.inp1 || 1;
    $scope.nums.inp2 = $scope.nums.inp2 || 1;
    $scope.nums.inp3 = $scope.nums.inp3 || 1;
    $scope.nums.inp4 = $scope.nums.inp4 || 1;
    $scope.nums.inp5 = $scope.nums.inp5 || 1;
    $scope.nums.inp6 = $scope.nums.inp6 || 1;
    $scope.nums.inp7 = $scope.nums.inp7 || 1;
    $scope.nums.inp8 = $scope.nums.inp8 || 1;
    $scope.nums.inp9 = $scope.nums.inp9 || 1;
    $scope.nums.inp10 = $scope.nums.inp10 || 1;

    $scope.data = [];

    $scope.update_chart = function() {
      $scope.data[0] = $scope.nums.inp1;
      $scope.data[1] = $scope.nums.inp2;
      $scope.data[2] = $scope.nums.inp3;
      $scope.data[3] = $scope.nums.inp4;
      $scope.data[4] = $scope.nums.inp5;
      $scope.data[5] = $scope.nums.inp6;
      $scope.data[6] = $scope.nums.inp7;
      $scope.data[7] = $scope.nums.inp8;
      $scope.data[8] = $scope.nums.inp9;
      $scope.data[9] = $scope.nums.inp10;
      console.log($scope.data);
    };

  }]);
})();
