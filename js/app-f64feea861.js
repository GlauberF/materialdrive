!function(){"use strict";angular.module("materialDrive",["ngMaterial","ngLocale","ngSanitize","ngFileUpload","ui.router","materialDrive.tpls","infinite-scroll"]),angular.module("materialDrive.tpls",[])}(),function(){"use strict";function e(e,t){var n={google:["$q","$state","$location","google",function(e,t,n,o){var r=e.defer();return o.authorize(!0).then(function(){r.resolve(o)},function(){r.promise.then(null,function(){t.go("gate.sign",{redirect:n.url()})}),r.reject()}),r.promise}]},o={auth:["$q","$state","google",function(e,t,n){return n.prepareGapi().then(function(n){return n.authorize(!0).then(function(){t.go("drive.category",{category:"mydrive"})},function(){return e.resolve()})})}]};e.otherwise("/drive/mydrive"),t.state("gate",{url:"",templateUrl:"app/gate/gate.tpl.html",controller:"GateController as gateCtrl",resolve:o}).state("gate.sign",{url:"/sign?redirect",templateUrl:"app/gate/gate.tpl.html",controller:"GateController as gateCtrl",resolve:o}).state("drive",{url:"/drive",templateUrl:"app/drive/drive.tpl.html",controller:"DriveController as driveCtrl",resolve:n}).state("drive.category",{url:"/:category",templateUrl:"app/drive/drive-list.tpl.html",controller:["$scope","$stateParams",function(e,t){e.driveCtrl.init(t)}]}).state("drive.folder",{url:"/folder/:folderId",templateUrl:"app/drive/drive-list.tpl.html",controller:["$scope","$stateParams",function(e,t){e.driveCtrl.init(t)}]}).state("new",{url:"/new?name&mimeType&parents",template:"",controller:["$scope","$stateParams","$window",function(e,t,n){n.opener&&n.opener.callback&&n.opener.callback().then(function(e){n.location.replace(e)})}]})}function t(e){e.interceptors.push(["$injector","$q",function(e,t){return{responseError:function(n){var o=e.get("$state"),r=e.get("google");return 401===n.status&&r.authorize(!0).then(function(){o.reload()},function(){o.go("gate")}),t.reject(n)}}}])}angular.module("materialDrive").config(["$urlRouterProvider","$stateProvider",e]).config(["$httpProvider",t])}(),function(){angular.module("materialDrive").constant("MimeType",{folder:"application/vnd.google-apps.folder",document:"application/vnd.google-apps.document",spreadsheet:"application/vnd.google-apps.spreadsheet",presentation:"application/vnd.google-apps.presentation"})}(),function(){"use strict";function e(){var e={};return{addListener:function(t,n){var o=e[t];o||(e[t]=o=[]),o.push(n)},notify:function(t,n){var o=e[t];o&&angular.forEach(o,function(e){e.callback(n)})},removeListener:function(t,n){var o=e[t],r=0;if(o)for(r=0;r<o.length;r++)if(n===o[r].listener){o.splice(r,1);break}}}}angular.module("materialDrive").factory("notifier",[e])}(),function(){function e(){return{startsWith:function(e,t){return e.length>=t.length&&e.substring(0,t.length)===t},offset:function(e){var t=e,n=0,o=0;do n+=t.offsetTop,o+=t.offsetLeft,t=t.offsetParent;while(!this.isNull(t));return{top:n,left:o}},isNull:function(e){return null===e},queryStringify:function(e){var t=[];return angular.forEach(e,function(n,o){angular.isUndefined(e[o])||t.push(o+"="+encodeURIComponent(n))}),t.join("&")}}}angular.module("materialDrive").factory("Util",e)}(),function(){"use strict";function e(e,i,a,l,s){var c;return{prepareGapi:function(){var e=this,t=i.defer();if(e.isReady())t.resolve(e);else var n=a(function(){e.isReady()&&(a.cancel(n),t.resolve(e))},100);return t.promise},isReady:function(){return angular.isDefined(gapi.auth)},authorize:function(e){var r=i.defer();return this.prepareGapi().then(function(){var t=function(){gapi.auth.authorize({client_id:n,scope:o,immediate:!!angular.isDefined(e)&&e},function(e){e&&e.access_token?r.resolve(e):r.reject()})};c?gapi.auth.checkSessionState({client_id:n,session_state:null},function(e){e?r.resolve(c):t()}):t()}),r.promise.then(function(e){c=e,t={params:{alt:"json"},headers:{Authorization:"Bearer "+c.access_token,"GData-Version":"3.0"}}})},isAuthenticated:function(){return angular.isDefined(t)},query:s,about:function(){return e.get(r.ABOUT,angular.copy(t))},filesList:function(n){var o="?q="+encodeURIComponent(n.query);return n.mimeType&&(o+=" and mimeType = '"+n.mimeType+"'"),n.pageToken&&(o+="&pageToken="+encodeURIComponent(n.pageToken)),n.maxResults&&(o+="&maxResults="+n.maxResults),n.orderBy&&(o+="&orderBy="+n.orderBy),e.get(r.FILES_LIST+o,angular.copy(t))},filesGet:function(n){return e.get([r.FILES_GET,"?fileId=",encodeURIComponent(n)].join(""),angular.copy(t))},newFile:function(n){return e.post(r.INSERT_METADATA,{title:n.title,mimeType:n.mimeType,parents:n.parents?[n.parents]:""},angular.copy(t))},getUploadEndpoint:function(n){return e({url:r.INSERT_FILE.concat("?uploadType=resumable"),method:"POST",headers:t.headers,data:{title:n.file.fileName||n.file.name,mimeType:n.file.type||"application/octet-stream",parents:n.parents?[n.parents]:""}})},uploadFile:function(e){var n=0,o=e.file.size;return l.http({url:e.endpoint,method:"PUT",headers:angular.extend({"Content-Range":["bytes ",n,"-",o-1,"/",e.file.size].join(""),"X-Upload-Content-Type":e.file.type},t.headers),data:e.file.slice(n,o)})},duplicateFile:function(n){return e.post(r.FILES_COPY.replace("%s",n.fileId),null,angular.copy(t))},moveToTrash:function(n){return e.post(r.FILES_TRASH.replace("%s",n.fileId),null,angular.copy(t))},moveTo:function(n){return e.patch([r.FILES_PATCH.replace("%s",n.fileId),"?addParents=",n.toFolderId,"&removeParents=",n.fromFolderId].join(""),null,angular.copy(t))}}}var t,n="608120956255-0me03edqv60mf1eilgdjoum9qcmv4deq.apps.googleusercontent.com",o=["https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive.readonly","https://www.googleapis.com/auth/drive.metadata.readonly","https://www.googleapis.com/auth/drive.appdata","https://www.googleapis.com/auth/drive.apps.readonly","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"],r={ABOUT:"https://www.googleapis.com/drive/v2/about",FILES_LIST:"https://www.googleapis.com/drive/v2/files",FILES_GET:"https://www.googleapis.com/drive/v2/files/fileId",INSERT_FILE:"https://www.googleapis.com/upload/drive/v2/files",INSERT_METADATA:"https://www.googleapis.com/drive/v2/files",FILES_COPY:"https://www.googleapis.com/drive/v2/files/%s/copy",FILES_DELETE:"https://www.googleapis.com/drive/v2/files/%s",FILES_TRASH:"https://www.googleapis.com/drive/v2/files/%s/trash",FILES_PATCH:"https://www.googleapis.com/drive/v2/files/%s"};angular.module("materialDrive").factory("google",["$http","$q","$interval","Upload","query",e]).constant("query",{incoming:"trashed = false and not 'me' in owners and sharedWithMe",recent:"(not mimeType = 'application/vnd.google-apps.folder') and lastViewedByMeDate > '1970-01-01T00:00:00Z' and trashed = false",starred:"trashed = false and starred = true",trash:"trashed = true and explicitlyTrashed = true",folder:"trashed = false and '%s' in parents",fullText:"trashed = false and fullText contains '%s'"})}(),function(){"use strict";angular.module("materialDrive").directive("mtdContextMenu",[function(){function e(e,t,n,o,r){function i(){e.contextMenuState.display="none",e.$digest()}var a=this,l=angular.element(t[0].body);e.onDropdownMenuSelected=function(t){e.onMenuSelected({menu:t})},e.$on("$destroy",function(){a._menuListElem.remove(),l.off("click",i)}),e.contextMenuState={left:0,top:0,display:"none"},a.init=function(t){var s=angular.element("<mtd-dropdown></mtd-dropdown>");s.attr({"class":"context-menu","menu-list":"menuList","on-menu-selected":"onDropdownMenuSelected(menu)","ng-style":"contextMenuState"}),n(s)(e),l.append(s),l.on("click",i),t.on("contextmenu",function(t){t.preventDefault();var n,i,a;e.onPopup()&&(n=t.clientX,i=t.clientY,e.contextMenuState.visibility="hidden",e.contextMenuState.display="block",e.$digest(),o(function(){a=r.offset(this),n+s[0].clientWidth>a.left+this.clientWidth&&(n-=n+s[0].clientWidth-(a.left+this.clientWidth)),i+s[0].clientHeight>a.top+this.clientHeight&&(i-=i+s[0].clientHeight-(a.top+this.clientHeight)),e.contextMenuState.left=n+"px",e.contextMenuState.top=i+"px",e.contextMenuState.visibility="visible"}.bind(this)))}),a._elem=t,a._menuListElem=s}}function t(e,t,n,o){o.init(t)}return{restrict:"A",scope:{menuList:"=",onPopup:"&",onMenuSelected:"&"},controller:["$scope","$document","$compile","$timeout","Util",e],controllerAs:"contextMenuCtrl",link:t}}])}(),function(){"use strict";angular.module("materialDrive").directive("mtdDropdown",[function(){function e(e){this.onMenuSelected=function(t){e.callback({menu:t})}}return{restrict:"EA",scope:{menuList:"=",callback:"&onMenuSelected"},templateUrl:"app/common/dropdown.tpl.html",controller:["$scope",e],controllerAs:"dropdownCtrl"}}])}(),function(){"use strict";function e(e,t){return{restrict:"A",compile:function(n,o){var r=e(o.mtdRightClick,null,!0);return function(e,n){n.on("contextmenu",function(n){var o=function(){r(e,{$event:n})};t.$$phase?e.$evalAsync(o):e.$apply(o)})}}}}angular.module("materialDrive").directive("mtdRightClick",["$parse","$rootScope",e])}(),function(){"use strict";function e(e,t,n,o){return{restrict:"A",compile:function(r,i){function a(e,n){n.on("dblclick",function(n){function o(){s(e,{$event:n})}t.$$phase?e.$evalAsync(o):e.$apply(o)})}function l(e,o){var r,i=300,a=!1;o.on("touchend",function(o){function l(){s(e,{$event:o})}a?(a=!1,Date.now()-r<i&&(t.$$phase?e.$evalAsync(l):e.$apply(l))):(r=Date.now(),a=!0,n(function(){a=!1},i))})}var s=e(i.mtdDoubleClick,null,!0);return function(e,t){"ontouchstart"in o?l(e,t):a(e,t)}}}}angular.module("materialDrive").directive("mtdDoubleClick",["$parse","$rootScope","$timeout","$window",e])}(),function(){"use strict";function e(e){return{link:function(t,n,o){o.$observe("mtdFocus",function(t){t&&e(function(){n.find("input").focus()})})}}}angular.module("materialDrive").directive("mtdFocus",["$timeout",e])}(),function(){"use strict";function e(e,t,n){function o(){n.authorize(!1).then(function(){var n=t.params.redirect||"/drive/mydrive";e.url(n)})}var r=this;r.authorize=o}angular.module("materialDrive").controller("GateController",["$location","$state","google",e])}(),function(){"use strict";function e(e,t,n,o,r,i,a,l,s,c){function u(e){var t=(s.query[e.category]||s.query.folder).replace("%s",e.folderId||"root"),n=[],r=C.get("menuList");switch(e.category){case"incoming":r[1].selected=!0;break;case"recent":r[2].selected=!0;break;case"starred":r[3].selected=!0;break;case"trash":r[4].selected=!0;break;default:r[0].selected=!0}S.breadcrumb=M.get("breadcrumb"),S.status=M.get("status"),S.selectedItemMap={},S.currentFolder={isRoot:!0},S.contextMenuList=[{name:"Make a copy",icon:"content_copy",enabled:!0},{name:"Move to",icon:"folder_open",enabled:!0},{name:"Remove",icon:"delete",enabled:!0}],S.loaded=!1,S.itemListController={query:t,maxResults:20,orderBy:"folder,title asc",isBusy:!1,getItemAtIndex:function(e){return this.getMoreItems(e),this.items&&this.items[e]?this.items[e]:null},getMoreItems:function(e){if(!this.isBusy){var t=this;this.nextPageToken&&this.items&&this.items.length<=e+1&&(this.isBusy=!0,s.filesList({query:this.query,pageToken:this.nextPageToken,maxResults:this.maxResults,orderBy:this.orderBy}).then(function(e){var n=e.data;t.isBusy=!1,t.nextPageToken=n.nextPageToken,t.items=t.items.concat(n.items)}),this.nextPageToken="")}},getLength:function(){return this.items?this.items.length:0}},n.push(s.filesList({query:t,orderBy:S.itemListController.orderBy,maxResults:S.itemListController.maxResults})),e.folderId&&n.push(s.filesGet(e.folderId)),o.all(n).then(function(e){var t=e[0].data;2===e.length&&(S.currentFolder=e[1].data,S.currentFolder.isRoot=0===S.currentFolder.parents.length),d(),S.itemListController=angular.extend(S.itemListController,t),S.loaded=!0})}function d(){var e,t,n=function(){return i.get("sidenav").get("menuList").filter(function(e){return e.selected})[0]};S.currentFolder.isRoot?(S.breadcrumb.splice(0,S.breadcrumb.length),S.breadcrumb.push(n())):(t=[S.currentFolder],(e=function(o){s.filesGet(o.id).then(function(o){var r=o.data;r.parents[0]?(t.push(r),e(r.parents[0])):(S.breadcrumb.splice(0,S.breadcrumb.length),S.breadcrumb.push(n()),t.reverse().forEach(function(e){S.breadcrumb.push(e)}))})})(S.currentFolder.parents[0]))}function p(e,t){t?S.selectedItemMap[e.id]?(delete S.selectedItemMap[e.id],e.isSelected=!1):(S.selectedItemMap[e.id]=e,e.isSelected=!0):S.selectedItemMap[e.id]||(w(),S.selectedItemMap[e.id]=e,e.isSelected=!0),e.isSelected&&(S.selectedItem=e)}function f(e,o){e.stopImmediatePropagation(),o.labels.trashed||(o.mimeType===c.folder?t.go("drive.folder",{category:t.params.category,folderId:o.id}):n.open(o.alternateLink))}function m(){t.go("drive.folder",{category:t.params.category,folderId:S.currentFolder.parents[0].id})}function g(){u(t.params)}function h(e){r.show({locals:{fileList:e.fileList,currentFolder:S.currentFolder},templateUrl:"app/dialog/upload-progress-dialog.tpls.html",escapeToClose:!1,clickOutsideToClose:!1,controllerAs:"modalCtrl",controller:"UploadProgressDialogController"}).then(function(){w(),u(t.params)})}function v(){var e=0,t=!1;return angular.forEach(S.selectedItemMap,function(n){e++,n.mimeType===c.folder&&(t=!0)}),!!e&&(S.contextMenuList[0].enabled=!(e>1||t),!0)}function y(e){switch(e.name){case"Make a copy":$();break;case"Remove":b();break;case"Move to":T()}}function w(){angular.forEach(S.selectedItemMap,function(e){e.isSelected=!1}),S.selectedItemMap={}}function $(){var e=[];angular.forEach(S.selectedItemMap,function(t,n){e.push(s.duplicateFile({fileId:n}))}),o.all(e).then(function(){w(),u(t.params)})}function b(){var e=r.confirm().title("Will be removed").ok("Yes").cancel("Cancel"),n=[];angular.forEach(S.selectedItemMap,function(e){n.push("<p>"+e.title+"</p>")}),e.htmlContent(n.join("")),r.show(e).then(function(){var e=[];angular.forEach(S.selectedItemMap,function(t,n){e.push(s.moveToTrash({fileId:n}))}),o.all(e).then(function(){w(),u(t.params)})},angular.noop)}function T(){r.show({controller:"NavigationDialogController",controllerAs:"vm",templateUrl:"app/dialog/navigation-dialog.tpl.html",bindToController:!0,clickOutsideToClose:!0,locals:{selectedItemMap:S.selectedItemMap}}).then(function(e){var n=[];angular.forEach(S.selectedItemMap,function(t,o){n.push(s.moveTo({fileId:o,fromFolderId:t.parents[0].id,toFolderId:e.id}))}),o.all(n).then(function(){w(),u(t.params)})})}function I(){return!(!a("gt-md")||!D.get("visible"))}var S=this,M=i.get("drive"),C=i.get("sidenav"),D=i.get("details");S.init=u,S.onContextMenuPopup=v,S.onContextMenuSelected=y,S.onItemClicked=p,S.onItemDoubleClicked=f,S.upToParentFolder=m,S.isScreenSize=a.bind(a),S.isDetailsLocked=I,S.MimeType=c,M||(M=i("drive"),M.put("breadcrumb",[]),M.put("status",{view:"list",search:!1})),C||(C=i("sidenav"),C.put("menuList",[{icon:"folder",label:"My Drive",href:"mydrive",index:0},{icon:"people",label:"Share with me",href:"incoming",index:1},{icon:"history",label:"Recent",href:"recent",index:2},{icon:"star",label:"Starred",href:"starred",index:3},{icon:"delete",label:"Trash",href:"trash",index:4}])),D||(D=i("details")),l.addListener("onNewItemCreated",{listener:S,callback:g}),l.addListener("onFileSelected",{listener:S,callback:h}),e.$on("$stateChangeSuccess",function(){S.selectedItem=void 0}),e.$on("$destroy",function(){l.removeListener("onNewItemCreated",S),l.removeListener("onFileSelected",S)})}angular.module("materialDrive").controller("DriveController",["$scope","$state","$window","$q","$mdDialog","$cacheFactory","$mdMedia","notifier","google","MimeType",e])}(),function(){"use strict";function e(e,t,n,o,r,i,a,l){function s(){i("sidenav").toggle()}function c(){var e=i("details");e.isOpen()||e.isLockedOpen()?(f.put("visible",!1),e.close()):(f.put("visible",!0),e.open())}function u(e){var t=o.defer();return a.filesList({query:a.query.fullText.concat(" or title contains '%s'").replace("%s",e)}).then(function(e){t.resolve(e.data.items)},t.reject),t.promise}function d(e,o){("click"===e.type||"keyup"===e.type&&13===e.keyCode)&&(o.mimeType===l.folder?n.go("drive.folder",{folderId:o.id}):t.open(o.alternateLink))}var p=this,f=r.get("details");p.toggleSidenav=s,p.toggleDetails=c,p.querySearchText=u,p.searchItemSelected=d,p.MimeType=l,p.status=r.get("drive").get("status"),p.breadcrumb=r.get("drive").get("breadcrumb"),e.$on("$stateChangeSuccess",function(){p.status.search=!1,p.searchText=""})}angular.module("materialDrive").controller("NavbarController",["$scope","$window","$state","$q","$cacheFactory","$mdSidenav","google","MimeType",e])}(),function(){"use strict";function e(e,t,n){function o(e){r.selectedMenu||(r.selectedMenu=r.menuList.filter(function(e){return e.selected})[0]),r.selectedMenu.selected=!1,e.selected=!0,r.selectedMenu=e,t("sidenav").toggle()}var r=this,i=e.get("sidenav");r.onMenuSelect=o,r.menuList=i.get("menuList"),r.user=i.get("userInfo"),n.about().then(function(e){var t=e.data;t.user=angular.extend({picture:{url:"assets/images/ic_account_circle_white_24px.svg"}},t.user),r.user=t.user,i.put("userInfo",t.user)})}angular.module("materialDrive").controller("SidenavController",["$cacheFactory","$mdSidenav","google",e])}(),function(){"use strict";function e(e,t,n,o,r,i){var a=this;a.isExpanded=!1,a.menuList=[{name:"Document",icon:{name:"fa fa-file-word-o fa-lg",bg:"file-word-bg"},mimeType:i.document},{name:"Spreadsheet",icon:{name:"fa fa-file-excel-o fa-lg",bg:"file-spreadsheet-bg"},mimeType:i.spreadsheet},{name:"Presentation",icon:{name:"fa fa-file-powerpoint-o fa-lg",bg:"file-presentation-bg"},mimeType:i.presentation},{name:"Folder",icon:{name:"fa fa-folder fa-lg",bg:"file-bg"},mimeType:i.folder}],a.onFileSelected=function(e){e.length&&r.notify("onFileSelected",{fileList:e})},a.onMenuClick=function(l,s,c){function u(t){e.callback=function(){return o.newFile({title:t,mimeType:d.mimeType,parents:c.isRoot?void 0:c}).then(function(e){r.notify("onNewItemCreated");var t=e.data;return t.alternateLink})},e.open(n.href("new"),"_blank")}var d=a.menuList[s],p={controller:"NameDialogController",controllerAs:"vm",templateUrl:"app/dialog/name-dialog.tpl.html",bindToController:!0,clickOutsideToClose:!0,targetEvent:l,locals:{item:d}};d.mimeType===i.folder?t.show(p).then(function(e){o.newFile({title:e,mimeType:d.mimeType,parents:c.isRoot?void 0:c}).then(function(){r.notify("onNewItemCreated")})}):(p.locals.onOk=u,t.show(p))}}angular.module("materialDrive").controller("NewItemFabController",["$window","$mdDialog","$state","google","notifier","MimeType",e])}(),function(){"use strict";function e(){return{restrict:"EA",scope:{item:"=mtdDetailsItem"},templateUrl:"app/drive/details.tpl.html",controller:["$scope","$mdSidenav","$mdMedia","$cacheFactory",function(e,t,n,o){n("gt-md")&&o.get("details").get("visible")?t("details").open():t("details").close()}],controllerAs:"detailsCtrl"}}angular.module("materialDrive").directive("mtdDetails",[e])}(),function(){"use strict";function e(e,t){var n=this;e.ok=function(){n.onOk&&n.onOk(n.fileName),t.hide(n.fileName)},e.cancel=function(){t.cancel()}}angular.module("materialDrive").controller("NameDialogController",["$scope","$mdDialog",e])}(),function(){"use strict";function e(e,t,n){function o(){e.hide(l.currentFolder)}function r(){l.path.length>1&&l.path.pop(),l.currentFolder=l.path[l.path.length-1],a(l.currentFolder.id)}function i(e){l.path.push(e),l.currentFolder=e,a(e.id)}function a(e){t.filesList({query:t.query.folder.replace("%s",e),mimeType:n.folder}).then(function(e){var t=e.data;l.folderList=t.items})}var l=this;l.currentFolder={title:"My Drive",id:"root",isRoot:!0},l.path=[l.currentFolder],l.selectFolder=o,l.exapnd=i,l.goToParent=r,a(l.currentFolder.id)}angular.module("materialDrive").controller("NavigationDialogController",["$mdDialog","google","MimeType",e])}(),function(){"use strict";function e(e,t,n,o,r){function i(){l.current.promise&&(o.length=0,l.current.promise.abort()),s>0?e.hide():e.cancel()}function a(){var i=o.pop();l.current={file:i,progress:0};var c=n.getUploadEndpoint({file:i,parents:r.isRoot?"":r}).then(function(e){return{endPoint:e.headers().location,file:i}});c=c.then(function(e){var t=n.uploadFile({endpoint:e.endPoint,file:e.file}).progress(function(e){l.current.progress=Math.min(100,Math.ceil(e.loaded/e.total*100))});return l.current.promise=t,t}),c.then(function(){t.show(t.simple().textContent("To upload "+l.current.file.name+" was Successful!").position("top right").hideDelay(2e3)),s++,o.length>0?a():e.hide()})}var l=this,s=0;l.abort=i,a()}angular.module("materialDrive").controller("UploadProgressDialogController",["$mdDialog","$mdToast","google","fileList","currentFolder",e])}();