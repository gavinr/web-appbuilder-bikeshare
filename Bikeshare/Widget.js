///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  "dojo/_base/declare",
  "jimu/BaseWidget",
  "./GBFS",
  "esri/layers/GraphicsLayer"
], function(declare, BaseWidget, GBFS, GraphicsLayer) {
  var clazz = declare([BaseWidget], {
    baseClass: "bikeshare",

    // Note - we are using ES6 features here, which are now supported in all browsers EXCEPT IE
    // If you need IE support you will need to either transpile this code or convert the
    // es6 features to their older equivalents (in parents)
    //
    // asyc/await (Promises): https://caniuse.com/#feat=async-functions
    // arrow functions (functions + bind): https://caniuse.com/#feat=arrow-functions
    // template strings (string concatenation): https://caniuse.com/#feat=template-literals
    postCreate: function() {
      this.inherited(arguments);

      this.graphicsLayer = new GraphicsLayer();
      this.map.addLayer(this.graphicsLayer);

      this.gbfs = new GBFS(this.config.gbfsUrl);
    },

    onOpen: async function() {
      try {
        var resBikeStatusInfo = await this.gbfs.free_bike_status();

        resBikeStatusInfo.graphics.forEach(graphic => {
          this.graphicsLayer.add(graphic);
        });
      } catch (e) {
        console.error("Error getting bike status:", e);
      }
    }
  });
  return clazz;
});
