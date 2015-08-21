'use strict';

angular.module('riotApiChallenge2App', ['n3-charts.linechart'])
    .controller('MainCtrl', function ($scope) {
        $scope.data = [
            {
                x: 0,
                val_0: 300000,
                val_1: 400000,
                val_2: 500000,
                val_3: 600000
            },
            {
                x: 1,
                val_0: 208060,
                val_1: 308060,
                val_2: 408060,
                val_3: 508060
            },
            {
                x: 2,
                x: 2,
                val_0: 16771,
                val_1: 116771,
                val_2: 216771,
                val_3: 316771
            },
            {
                x: 3,
                val_0: 97998,
                val_1: 2002,
                val_2: 102002,
                val_3: 202002
            },
        ];

        $scope.options = {
            axes: {
                x: {
                    key: "x"
                },
                y: {
                    type: "log"
                }
            },
            series: [
                {
                    y: "val_0",
                    label: "Batmaaan",
                    color: "#d62728"
                }
            ]
        };
    });
