!function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/components/dropdown.tpl.html",'<md-whiteframe class="md-whiteframe-z1" layout="column">\n  <md-button ng-if="menu.enabled" class="dropdown-menu-item" ng-repeat="menu in menuList" ng-click="dropdownCtrl.onMenuSelected(menu)" layout="row" aria-label="{{::menu.name}}">\n    <md-icon md-font-icon="material-icons">{{::menu.icon}}</md-icon> <span class="name" ng-bind="::menu.name"></span>\n  </md-button>\n</md-whiteframe>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/details.tpl.html",'<md-toolbar class="md-tall" layout-align="center center">\n  <div ng-if="!item" layout-padding>\n    <div class="md-body-2">Select a file or folder to view its details.</div>\n  </div>\n  <div ng-if="item" layout-padding>\n    <div class="md-title" ng-bind="item.title"></div>\n    <div>\n      <span class="md-caption">Edited</span> <span class="md-caption" ng-bind="item.modifiedDate|date:\'mediumDate\'"></span>\n    </div>\n  </div>\n</md-toolbar>\n\n<md-content flex>\n  <div ng-if="!item" layout="row" layout-align="center center" layout-padding>\n    <i class="material-icons md-48 md-dark">format_quote</i>\n  </div>\n  <div ng-if="item" layout="column">\n    <div ng-if="!detailsCtrl.isFolder()" layout="column">\n      <img ng-src="https://drive.google.com/thumbnail?id={{item.id}}&sz=w300-h180-p-k-nu">\n      <md-divider></md-divider>\n    </div>\n\n    <div layout-padding layout-margin>\n      <div layout="row">\n        <h1 class="md-body-2" flex="35">Type</h1>\n        <h2 class="md-body-1" flex ng-bind="item.mimeType"></h2>\n      </div>\n      <div layout="row">\n        <h1 class="md-body-2" flex="35">Quota used</h1>\n        <h2 class="md-body-1" flex ng-bind="item.quotaBytesUsed"></h2>\n      </div>\n      <div layout="row">\n        <h1 class="md-body-2" flex="35">Location</h1>\n        <h2 class="md-body-1" flex><span ng-bind="name" ng-repeat="name in item.spaces"></span><span ng-if="$index > 1 && !$last">, </span></h2>\n      </div>\n      <div layout="row">\n        <h1 class="md-body-2" flex="35">Owner</h1>\n        <h2 class="md-body-1" flex><span ng-bind="name" ng-repeat="name in item.ownerNames"></span><span ng-if="$index > 1 && !$last">, </span></h2>\n      </div>\n      <div layout="row">\n        <h1 class="md-body-2" flex="35">Opened</h1>\n        <h2 class="md-body-1" flex ng-bind="item.lastViewedByMeDate|date:\'mediumDate\'"></h2>\n      </div>\n      <div layout="row">\n        <h1 class="md-body-2" flex="35">Created</h1>\n        <h2 class="md-body-1" flex ng-bind="item.createdDate|date:\'mediumDate\'"></h2>\n      </div>\n    </div>\n  </div>\n</md-content>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/drive-list.tpl.html",'<div flex layout="column" class="wrapper">\n  <md-progress-linear ng-if="!driveCtrl.loaded" md-mode="indeterminate" style="position:absolute;"></md-progress-linear>\n\n  <md-list class="drive-list" ng-if="driveCtrl.loaded" flex layout="column">\n\n    <md-list-item class="drive-list-item" ng-if="!driveCtrl.currentFolder.isRoot" ng-click="driveCtrl.upToParentFolder()">\n      <span class="fa fa-level-up"></span>&nbsp;&nbsp;...\n      <md-divider></md-divider>\n    </md-list-item>\n\n    <div ng-if="driveCtrl.loaded && !driveCtrl.itemListController.items.length" layout-align="center center" layout="column">\n      <i class="material-icons md-48 md-dark">format_quote</i> There is no item.\n    </div>\n\n    <md-virtual-repeat-container flex>\n      <md-list-item class="drive-list-item" md-virtual-repeat="item in driveCtrl.itemListController" md-on-demand="true" ng-class="{selected: item.isSelected}" ng-dblclick="driveCtrl.onItemDoubleClicked(item)" ng-click="driveCtrl.onItemClicked(item, true)" mtd-right-click="driveCtrl.onItemClicked(item, false)" aria-label="{{item.title}} selected">\n        <img class="icon" ng-src="{{item.iconLink}}">\n        <span class="name" ng-bind="item.title"></span>\n        <md-divider></md-divider>\n      </md-list-item>\n    </md-virtual-repeat-container>\n\n  </md-list>\n\n</div>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/drive.tpl.html",'<div layout="row" flex ng-class="{\'prevent-backdrop\': driveCtrl.isScreenSize(\'gt-md\')}" layout-fill>\n  <md-sidenav ng-controller="SidenavController as sidenavCtrl" class="md-sidenav-left md-whiteframe-z2" md-component-id="sidenav" md-is-locked-open="$mdMedia(\'gt-md\')" ng-include="\'app/drive/sidenav.tpl.html\'"></md-sidenav>\n\n  <div class="file-list-wrapper" layout="column" flex>\n\n    <md-toolbar ng-controller="NavbarController as navbarCtrl" class="navbar md-whiteframe-z2 md-tall" ng-include="\'app/drive/navbar.tpl.html\'"></md-toolbar>\n\n    <md-content class="md-sidenav-left md-whiteframe-z2" mtd-context-menu menu-list="driveCtrl.contextMenuList" on-menu-selected="driveCtrl.onContextMenuSelected(menu)" on-popup="driveCtrl.onContextMenuPopup()" layout="column" flex md-scroll-y ui-view></md-content>\n\n    <div ng-controller="NewItemFabController as ctrl"  class="fab-container">\n      <md-fab-speed-dial ng-hide="demo.hidden" md-direction="up" class="md-scale">\n        <md-fab-trigger>\n          <md-button aria-label="menu" class="md-fab md-warn">\n            <md-icon md-font-icon="material-icons">add</md-icon>\n          </md-button>\n        </md-fab-trigger>\n        <md-fab-actions>\n          <div ng-repeat="menu in ctrl.menuList">\n            <md-button aria-label="{{::menu.name}}" class="md-fab md-raised md-mini" ng-class="menu.icon.bg" ng-click="ctrl.menuClick($event, $index)">\n              <md-tooltip md-direction="left">{{::menu.name}}</md-tooltip>\n              <md-icon md-font-icon="{{menu.icon.name}}"></md-icon>\n            </md-button>\n          </div>\n          <div>\n            <md-button class="md-fab md-raised md-mini file-bg" aria-label="Upload" ngf-select ngf-multiple="true" ngf-change="ctrl.onFileSelected($files, $file, $event, $rejectedFiles)">\n              <md-tooltip md-direction="left">Upload</md-tooltip>\n              <md-icon md-font-icon="fa fa-cloud-upload fa-lg"></md-icon>\n            </md-button>\n          </div>\n        </md-fab-actions>\n      </md-fab-speed-dial>\n    </div>\n\n  </div>\n\n  <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="details" md-is-locked-open="driveCtrl.isDetailsLocked()" layout="column">\n    <div class="details" mtd-details="driveCtrl.selectedItem" flex></div>\n  </md-sidenav>\n</div>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/name-dialog.tpl.html",'<md-dialog>\n  <md-dialog-content>\n    <md-subheader>{{::vm.item.name}}</md-subheader>\n    <div class="row">\n      <form ng-submit="ok()" novalidate>\n        <md-input-container>\n          <label>Name</label>\n          <input type="text" ng-model="vm.fileName">\n        </md-input-container>\n      </form>\n    </div>\n  </md-dialog-content>\n</md-dialog>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/navbar.tpl.html",'<div class="md-toolbar-tools" layout="row" layout-align="space-between center">\n  <div ng-show="!navbarCtrl.queryFormState">\n    <md-button class="md-icon-button" ng-click="navbarCtrl.toggleSidenav()" hide-gt-md aria-label="Toggle Sidenav">\n      <md-icon md-font-icon="material-icons">menu</md-icon>\n    </md-button>\n  </div>\n  <div ng-show="!navbarCtrl.queryFormState">\n    <md-button class="md-icon-button" ng-click="navbarCtrl.searchText = \'\'; navbarCtrl.queryFormState = \'on\'" aria-label="Toggle Search form">\n      <md-icon md-font-icon="material-icons">search</md-icon>\n    </md-button>\n    <md-button class="md-icon-button" aria-label="Toggle Details" ng-click="navbarCtrl.toggleDetails()">\n      <md-icon md-font-icon="material-icons">info_outline</md-icon>\n    </md-button>\n  </div>\n  <div class="search-form-wrapper" ng-show="navbarCtrl.queryFormState" flex>\n    <md-autocomplete md-selected-item="navbarCtrl.selectedItem" md-search-text="navbarCtrl.searchText" md-items="item in navbarCtrl.querySearchText(navbarCtrl.searchText)" md-item-text="item.title" placeholder="Search Drive" md-selected-item-change="navbarCtrl.searchItemSelected()" style="padding-left: 40px;" mtd-focus="{{navbarCtrl.queryFormState}}">\n      <md-item-template>\n        <span md-highlight-text="navbarCtrl.searchText">{{item.title}}</span>\n      </md-item-template>\n      <md-not-found>\n        No matches found for "{{navbarCtrl.searchText}}".\n      </md-not-found>\n    </md-autocomplete>\n    <md-button class="md-icon-button md-primary btn-close-search-form" ng-click="navbarCtrl.queryFormState = \'\'" aria-label="Back to Navbar">\n      <md-icon md-font-icon="material-icons">arrow_back</md-icon>\n    </md-button>\n  </div>\n</div>\n\n<div class="md-toolbar-tools" ng-if="navbarCtrl.breadcrumb.length > 0">\n  <ol class="breadcrumb">\n    <li class="breadcrumb-item" ng-repeat="item in navbarCtrl.breadcrumb">\n      <md-button ng-if="$first" class="breadcrumb-item-inner" ui-sref="drive.category({category: item.href})" aria-label="{{::item.label}}">{{::item.label}}</md-button>\n      <md-button ng-if="!$first" class="breadcrumb-item-inner" ui-sref="drive.folder({folderId: item.id})" aria-label="{{::item.title}}">{{::item.title}}</md-button>\n      <img class="breadcrumb-separator" src="https://material.angularjs.org/latest/img/docArrow.png" ng-if="navbarCtrl.breadcrumb.length > 1 && !$last">\n    </li>\n  </ol>\n</div>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/navigation-dialog.tpl.html",'<md-dialog class="file-navigation-dialog md-content-overflow" aria-label="dialog">\n  <h1 class="header md-title">Move to</h1>\n  <md-divider></md-divider>\n  <h1 class="md-subheader current-folder clickable" ng-click="vm.goToParent()">\n    <span class="fa fa-arrow-left" ng-if="!vm.currentFolder.isRoot"></span> <span ng-bind="vm.currentFolder.title"></span>\n  </h1>\n  <md-dialog-content>\n    <md-list class="drive-list" ng-repeat="folder in vm.folderList">\n      <md-list-item class="drive-list-item" aria-label="{{::folder.title}}" ng-click="!vm.selectedItemMap[folder.id] && vm.exapnd(folder)" ng-class="{disabled: vm.selectedItemMap[folder.id]}">\n        <img class="icon" ng-src="{{folder.iconLink}}">\n        <span class="name" ng-bind="::folder.title"></span>\n      </md-list-item>\n      <md-divider></md-divider>\n    </md-list>\n  </md-dialog-content>\n  <div class="md-actions" layout="row">\n    <md-button ng-click="vm.selectFolder()" class="md-primary">Select</md-button>\n  </div>\n</md-dialog>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/sidenav.tpl.html",'<md-toolbar class="md-tall">\n  <md-list-item>\n    <img ng-src="{{sidenavCtrl.user.picture.url}}" class="face" alt="{{sidenavCtrl.user.displayName}}">\n    <div class="md-list-item-text">\n      <h1 class="md-title" ng-bind="::sidenavCtrl.user.displayName"></h1>\n      <h1 class="md-body-1" ng-bind="::sidenavCtrl.user.emailAddress"></h1>\n    </div>\n  </md-list-item>\n</md-toolbar>\n\n<md-content flex layout="column">\n  <md-list class="sidenav-menu-list-container">\n    <md-list-item class="list-item" ng-repeat="menu in sidenavCtrl.menuList">\n      <md-button class="md-primary list-item-inner" ng-class="{\'md-accent\': menu.selected}" ui-sref="drive.category({category: menu.href})" ng-click="sidenavCtrl.onMenuSelect(menu)" flex aria-label="{{::menu.label}}">\n        <md-icon md-font-icon="material-icons">{{::menu.icon}}</md-icon>\n        <span style="padding-left: 10px;" ng-bind="::menu.label"></span>\n        <md-divider></md-divider>\n      </md-button>\n    </md-list-item>\n  </md-list>\n</md-content>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/drive/upload-progress-dialog.tpls.html",'<md-dialog>\n  <md-dialog-content>\n    <h2>Now uploding...</h2>\n    <div class="row">\n      <md-progress-linear md-mode="indeterminate"></md-progress-linear>\n    </div>\n  </md-dialog-content>\n  <div class="md-actions" layout="row">\n    <md-button ng-show="vm.prepared" ng-click="vm.abort()" aria-label="Cancel">Cancel</md-button>\n  </div>\n</md-dialog>\n')}])}(),function(n){try{n=angular.module("materialDrive.tpls")}catch(e){n=angular.module("materialDrive.tpls",[])}n.run(["$templateCache",function(n){"use strict";n.put("app/gate/gate.tpl.html",'<div layout="row" layout-align="center center" flex>\n  <md-button class="md-fab md-primary btn-gate" ng-click="gateCtrl.authorize()" aria-label="Enter Drive">\n    <md-icon class="icon-gate" md-font-icon="fa fa-power-off fa-5x"></md-icon>\n  </md-button>\n</div>\n')}])}();