

export function getClassesSets() {
    let localClassesSets = {
        "classesSets": [
            {
                "name": "Cityscapes",
                "objects": [
                    {
                        "label": "VOID",
                        "color": "#CFCFCF",
                        "classIndex": 0,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.80859375,
                        "green": 0.80859375,
                        "blue": 0.80859375
                    },
                    {
                        "label": "Road",
                        "color": "#804080",
                        "classIndex": 1,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.5,
                        "green": 0.25,
                        "blue": 0.5
                    },
                    {
                        "label": "Sidewalk",
                        "color": "#F423E8",
                        "classIndex": 2,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.953125,
                        "green": 0.13671875,
                        "blue": 0.90625
                    },
                    {
                        "label": "Parking",
                        "color": "#FAAAA0",
                        "classIndex": 3,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.9765625,
                        "green": 0.6640625,
                        "blue": 0.625
                    },
                    {
                        "label": "Rail Track",
                        "color": "#E6968C",
                        "classIndex": 4,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.8984375,
                        "green": 0.5859375,
                        "blue": 0.546875
                    },
                    {
                        "label": "Person",
                        "color": "#DC143C",
                        "classIndex": 5,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.859375,
                        "green": 0.078125,
                        "blue": 0.234375
                    },
                    {
                        "label": "Rider",
                        "color": "#FF0000",
                        "classIndex": 6,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.99609375,
                        "green": 0.0,
                        "blue": 0.0
                    },
                    {
                        "label": "Car",
                        "color": "#0000E8",
                        "classIndex": 7,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.0,
                        "blue": 0.90625
                    },
                    {
                        "label": "Truck",
                        "color": "#000046",
                        "classIndex": 8,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.0,
                        "blue": 0.2734375
                    },
                    {
                        "label": "Bus",
                        "color": "#003C64",
                        "classIndex": 9,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.234375,
                        "blue": 0.390625
                    },
                    {
                        "label": "On Rails",
                        "color": "#E6968C",
                        "classIndex": 10,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.8984375,
                        "green": 0.5859375,
                        "blue": 0.546875
                    },
                    {
                        "label": "Motorcycle",
                        "color": "#0000E6",
                        "classIndex": 11,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.0,
                        "blue": 0.8984375
                    },
                    {
                        "label": "Bicycle",
                        "color": "#770B20",
                        "classIndex": 12,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.46484375,
                        "green": 0.04296875,
                        "blue": 0.125
                    },
                    {
                        "label": "Caravan",
                        "color": "#00005A",
                        "classIndex": 13,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.0,
                        "blue": 0.3515625
                    },
                    {
                        "label": "Trailer",
                        "color": "#00006E",
                        "classIndex": 14,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.0,
                        "blue": 0.4296875
                    },
                    {
                        "label": "Building",
                        "color": "#464646",
                        "classIndex": 15,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.2734375,
                        "green": 0.2734375,
                        "blue": 0.2734375
                    },
                    {
                        "label": "Wall",
                        "color": "#66669C",
                        "classIndex": 16,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.3984375,
                        "green": 0.3984375,
                        "blue": 0.609375
                    },
                    {
                        "label": "Fence",
                        "color": "#BE9999",
                        "classIndex": 17,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.7421875,
                        "green": 0.59765625,
                        "blue": 0.59765625
                    },
                    {
                        "label": "Guard Rail",
                        "color": "#B4A5B4",
                        "classIndex": 18,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.703125,
                        "green": 0.64453125,
                        "blue": 0.703125
                    },
                    {
                        "label": "Bridge",
                        "color": "#966464",
                        "classIndex": 19,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.5859375,
                        "green": 0.390625,
                        "blue": 0.390625
                    },
                    {
                        "label": "Tunnel",
                        "color": "#96785A",
                        "classIndex": 20,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.5859375,
                        "green": 0.46875,
                        "blue": 0.3515625
                    },
                    {
                        "label": "Pole",
                        "color": "#999999",
                        "classIndex": 21,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.59765625,
                        "green": 0.59765625,
                        "blue": 0.59765625
                    },
                    {
                        "label": "Pole Group",
                        "color": "#999999",
                        "classIndex": 22,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.59765625,
                        "green": 0.59765625,
                        "blue": 0.59765625
                    },
                    {
                        "label": "Traffic Sign",
                        "color": "#DCDC00",
                        "classIndex": 23,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.859375,
                        "green": 0.859375,
                        "blue": 0.0
                    },
                    {
                        "label": "Traffic Light",
                        "color": "#FAAA1E",
                        "classIndex": 24,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.9765625,
                        "green": 0.6640625,
                        "blue": 0.1171875
                    },
                    {
                        "label": "Vegetation",
                        "color": "#6B8E23",
                        "classIndex": 25,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.41796875,
                        "green": 0.5546875,
                        "blue": 0.13671875
                    },
                    {
                        "label": "Terrain",
                        "color": "#98FB98",
                        "classIndex": 26,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.59375,
                        "green": 0.98046875,
                        "blue": 0.59375
                    },
                    {
                        "label": "Sky",
                        "color": "#4682B4",
                        "classIndex": 27,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.2734375,
                        "green": 0.5078125,
                        "blue": 0.703125
                    },
                    {
                        "label": "Ground",
                        "color": "#510051",
                        "classIndex": 28,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.31640625,
                        "green": 0.0,
                        "blue": 0.31640625
                    },
                    {
                        "label": "Dynamic",
                        "color": "#6F4A00",
                        "classIndex": 29,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.43359375,
                        "green": 0.2890625,
                        "blue": 0.0
                    },
                    {
                        "label": "Static",
                        "color": "#000000",
                        "classIndex": 30,
                        "mute": false,
                        "solo": false,
                        "visible": true,
                        "red": 0.0,
                        "green": 0.0,
                        "blue": 0.0
                    }
                ]
            },
            {
                "name": "AD20",
                "objects": [
                    {
                        "label": "VOID",
                        "color": "#CFCFCF",
                        "classIndex": 0,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Void",
                        "color": "#FF8800",
                        "classIndex": 1,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Road",
                        "color": "#799024",
                        "classIndex": 2,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Pedestrian",
                        "color": "#FAFFF5",
                        "classIndex": 3,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Car",
                        "color": "#FF6D67",
                        "classIndex": 4,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Truck",
                        "color": "#FF5B8E",
                        "classIndex": 5,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Bus",
                        "color": "#FF6FA2",
                        "classIndex": 6,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "On rails",
                        "color": "#FF7FC3",
                        "classIndex": 7,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Motorcycle",
                        "color": "#FFA859",
                        "classIndex": 8,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Bicycle",
                        "color": "#FFDB62",
                        "classIndex": 9,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Sky",
                        "color": "#87D8FF",
                        "classIndex": 10,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Vegetation",
                        "color": "#7BC32B",
                        "classIndex": 11,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Sidewalk",
                        "color": "#827E67",
                        "classIndex": 12,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Traffic sign",
                        "color": "#9E9BFF",
                        "classIndex": 13,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Lane marking",
                        "color": "#DDCDFF",
                        "classIndex": 14,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Building",
                        "color": "#785C6F",
                        "classIndex": 15,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Traffic light",
                        "color": "#119599",
                        "classIndex": 16,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Snow covered",
                        "color": "#F1F1EF",
                        "classIndex": 17,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Pole",
                        "color": "#FBB577",
                        "classIndex": 18,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Unpaved road",
                        "color": "#C0AE89",
                        "classIndex": 19,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Guard rail",
                        "color": "#4D3D48",
                        "classIndex": 20,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    }
                ]
            },
            {
                "name": "33 Classes",
                "objects": [
                    {
                        "label": "VOID",
                        "color": "#CFCFCF",
                        "classIndex": 0,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 1",
                        "color": "#805959",
                        "classIndex": 1,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 2",
                        "color": "#e6cfcf",
                        "classIndex": 2,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 3",
                        "color": "#bf6060",
                        "classIndex": 3,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 4",
                        "color": "#72a372",
                        "classIndex": 4,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 5",
                        "color": "#598059",
                        "classIndex": 5,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 6",
                        "color": "#cfe6cf",
                        "classIndex": 6,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 7",
                        "color": "#60bf60",
                        "classIndex": 7,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 8",
                        "color": "#647d8f",
                        "classIndex": 8,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 9",
                        "color": "#596f80",
                        "classIndex": 9,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 10",
                        "color": "#cfdce6",
                        "classIndex": 10,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 11",
                        "color": "#6096bf",
                        "classIndex": 11,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 12",
                        "color": "#ccae8f",
                        "classIndex": 12,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 13",
                        "color": "#806c59",
                        "classIndex": 13,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 14",
                        "color": "#e6dacf",
                        "classIndex": 14,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 15",
                        "color": "#bf9060",
                        "classIndex": 15,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 16",
                        "color": "#e68273",
                        "classIndex": 16,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 17",
                        "color": "#804840",
                        "classIndex": 17,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 18",
                        "color": "#e6d2cf",
                        "classIndex": 18,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 19",
                        "color": "#bf4330",
                        "classIndex": 19,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 20",
                        "color": "#54a872",
                        "classIndex": 20,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 21",
                        "color": "#408057",
                        "classIndex": 21,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 22",
                        "color": "#cfe6d7",
                        "classIndex": 22,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 23",
                        "color": "#30bf64",
                        "classIndex": 23,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 24",
                        "color": "#5877b1",
                        "classIndex": 24,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 25",
                        "color": "#405680",
                        "classIndex": 25,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 26",
                        "color": "#cfd7e6",
                        "classIndex": 26,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 27",
                        "color": "#3062bf",
                        "classIndex": 27,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 28",
                        "color": "#e6b473",
                        "classIndex": 28,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 29",
                        "color": "#806440",
                        "classIndex": 29,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 30",
                        "color": "#e6dccf",
                        "classIndex": 30,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 31",
                        "color": "#bf8130",
                        "classIndex": 31,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    },
                    {
                        "label": "Class 32",
                        "color": "#ff4400",
                        "classIndex": 32,
                        "mute": null,
                        "solo": null,
                        "visible": null,
                        "red": null,
                        "green": null,
                        "blue": null
                    }
                ]
            }
        ]
    }

    return localClassesSets;
}