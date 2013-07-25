# Podio client for Nodejs
This node module provides a set of methods to interact against PODIO's REST services.
The module was created as part of [KidoZen](http://www.kidozen.com) project, as a connector for its Enterprise API feature.

## Installation

Use npm to install the module:

```
> npm install podio-api
```

## Runing tests

Use npm to run the set of tests

```
> npm test
```

## API

Due to the asynchronous nature of Nodejs, this module uses callbacks in requests. All callbacks have 2 arguments: `err` and `data`.

```
function callback (err, data) {
	// err contains an Error class instance, if any
	// data contains the resulting data
} 
``` 

### Constructor

The module exports a class and its constructor requires a configuration object with following properties
* `client_id`: Required string. Get it from yours "API key" at Podio. https://developers.podio.com/authentication
* `client_secret`: Required string. Get it from yours "API key" at Podio. https://developers.podio.com/authentication
* `apiEndpoint`: Optional string. API's endpoint, by defaults it is https://api.podio.com
* `authEndpoint`: Optional string. Autorization endpoint, by defaults it is https://podio.com
* `userFlow`: Optional. Object instance containing user credentials
	* `username`: Optional string. Podio's  user name
	* `password`: Optional string. User's password
* `appFlow`: Optional. Object instance containing application credentials
	* `app_id`: Optional string. Application Id
	* `app_token`: Optional string. Application token

User and Application flows for authentication are supported, both are optional but only one can be specified at the same time.

```
var Podio = require("podio-api");
var podio = new Podio({ client_id: "...", client_secret: "..." });
```

### Authentication
To invoke methods that require authentication, the developer can invoke them passing the user credentials (username & password), the application credentials (app_id & app_token) or the authentication token obtained executng the authenticate method.

#### authenticate(options, callback)
This method should be used to authenticate user or application credentials. A successed authentication will return an object instance containing the `auth` property. The value of this property is the authentication token that will be required by other methods.

**Parameters:**
* `options`: A required object instance containing authentication's parameters:
	* `username`: Optional string.
	* `password`: Optional string.
	* `app_id`: Optional string.
	* `app_token`: Optional string.
* `callback`: A required function for callback.

```
podio.authenticate({ username:"foo", password: "bar" }, function(err, result) {
	if (err) return console.error (err);
	console.log (result.auth);
});
```

### Methods
All public methods has the same signature, their have two arguments: `options` and `callback`.
* `options` must be an object instance containig all parameters for the method.
* `callback` must be a function.


Every single method could have required parameters, optional parameters and a body. 
#### Required parameters:
For each required parameter, the 'options' object must have a property with the same name of the parameter.
By instance, the method ['Get Application Field'](https://developers.podio.com/doc/applications/get-app-field-22353) has two required parameters: `app_id` and `field_id`. Below you can see a sample retrieving the field 'Name' of application with ID 1234.

```
var options = {
	auth: "...",
	app_id: 1234, 
	field_id: "Name"
};

podio.applicationsGetAppField(options, function (err, result) {
	if (err) return console.error(err);
	console.log(result);
});
```

### Optional parameters: 
When a method has one or more optional parameters, the `options` object must have a `params` property containing the optional parameters. By instance the method ['Get All User Applications'](https://developers.podio.com/doc/applications/get-all-user-apps-5902728) has a couple of optional parameters to limit and sort the response:

```
var options = {
	auth: "...",
	params: { 
		limit: 10, 
		order: "name"
	}
};

podio.applicationsGetAllUserApps(options, function (err, result) {
	if (err) return console.error(err);
	console.log(result);
});
```

### Body
Many methods require to send a body as part of the HTTP Request. For these cases the developer should include a `body` property into the `options` object. Below you can see a sample invoking ['Update An Application'](https://developers.podio.com/doc/applications/update-app-22352) method.

```
var options = {
	auth: "...",
	app_id: 1234,
	body: {
		config: { ... },
		fields: [ ... ],
		...
	}
};

podio.applicationsUpdateApp(options, function (err, result) {
	if (err) return console.error(err);
	console.log(result);
});
```
### Methods implemented.
Below are listed all methods implemented by this module.

##### Calendar
	calendarGetAppCalendar  
	calendarGetCalendarSummary  
	calendarGetExportByRef  
	calendarGetCalendarSummaryForSpace  
	calendarGetGlobalCalendar  
	calendarGetGlobalExport  
	calendarGetGlobalCalendarAsIcal  
	calendarGetExportsByReference  
	calendarGetGlobalExports  
	calendarGetItemFieldCalendarAsIcal  
	calendarGetMutesInGlobalCalendar  
	calendarGetSpaceCalendar  
	calendarGetTaskCalendarAsIcal  
	calendarSetReferenceExport  
	calendarStopReferenceExport  
	calendarGetAppCalendarAsIcal  
	calendarGetCalendarSummaryForPersonal  
	calendarGetSpaceCalendarAsIcal  
##### Email
	emailExportEmailContactForReferenceToLinkedAccount  
	emailExportGlobalEmailContactToLinkedAccount  
	emailGetAppEmailConfiguration  
	emailGetEmailContactForReferenceAsVcard  
	emailGetGlobalContact  
	emailGetGroups  
	emailGetGlobalEmailContactAsVcard  
	emailUnsubscribeFromAll  
	emailUpdateAppEmailConfiguration  
	emailGetEmailContactForReference  
	emailUpdateGroups  
##### Actions
	actionsGetAction  
##### Batch
	batchGetBatch  
	batchGetBatches  
	batchGetRunningBatches  
##### Bulletins
	bulletinsGetBulletin  
	bulletinsGetBulletins  
##### Embeds
	embedsAddAnEmbed  
##### Conversations
	conversationsAddParticipants  
	conversationsCreateConversation  
	conversationsCreateConversationOnObject  
	conversationsGetConversation  
	conversationsCreateConversationV2  
	conversationsGetConversationEvent  
	conversationsGetConversationEvents  
	conversationsGetConversationsOnObject  
	conversationsGetFlaggedConversationCounts  
	conversationsGetExistingDirectConversation  
	conversationsGetFlaggedConversations  
	conversationsMarkConversationAsUnread  
	conversationsReplyToConversation  
	conversationsUnstarConversation  
	conversationsSearchConversations  
	conversationsStarConversation  
	conversationsGetConversations  
	conversationsMarkAllConversationsAsRead  
	conversationsLeaveConversation  
	conversationsMarkConversationAsRead  
##### Hooks
	hooksCreateHook  
	hooksDeleteHook  
	hooksGetHooks  
	hooksRequestHookVerification  
	hooksValidateHookVerification  
##### Devices
	devicesGetDeviceTokens  
	devicesRegisterMobileDevice  
	devicesUnregisterMobileDevice  
	devicesInstallAppOnMobileDevice  
##### Applications
	applicationsActivateApp  
	applicationsAddNewApp  
	applicationsAddNewAppField  
	applicationsDeactivateApp  
	applicationsDeleteAppField  
	applicationsDeleteApp  
	applicationsGetAppDependencies  
	applicationsGetAllUserApps  
	applicationsGetAppOnSpaceByUrlLabel  
	applicationsGetAppField  
	applicationsGetApp  
	applicationsGetCalculationsForApp  
	applicationsGetAppsAvailableForSpace  
	applicationsGetAppsBySpace  
	applicationsGetFeatures  
	applicationsGetTopApps  
	applicationsGetSpaceAppDependencies  
	applicationsInstallApp  
	applicationsGetTopAppsForOrganization  
	applicationsUpdateAnAppField  
	applicationsUpdateApp  
	applicationsUpdateAppDescription  
	applicationsUpdateAppOrder  
	applicationsUpdateAppUsageInstructions  
##### Comments
	commentsAddCommentToObject  
	commentsDeleteAComment  
	commentsGetCommentsOnObject  
	commentsUpdateAComment  
	commentsGetAComment  
##### Notifications
	notificationsGetInboxNewCount  
	notificationsGetNotification  
	notificationsGetNotificationSettings  
	notificationsMarkAllNotificationsAsViewed  
	notificationsGetNotifications  
	notificationsMarkNotificationAsViewed  
	notificationsMarkNotificationsAsViewedByRef  
	notificationsUn-starNotification  
	notificationsUpdateNotificationSettings  
	notificationsStarNotification  
##### Forms
	formsActivateForm  
	formsCreateForm  
	formsDeactivateForm  
	formsDeleteFrom  
	formsGetForm  
	formsGetForms  
	formsUpdateForm  
##### Files
	filesAttachFile  
	filesCopyFile  
	filesDeleteFile  
	filesGetFile  
	filesGetFiles  
	filesGetFilesOnApp  
	filesGetLatestFilesOnSpace  
	filesGetFilesOnSpace  
	filesReplaceFile  
	filesUploadFile  
	filesGetLinkedAccountFiles  
	filesUpdateFile  
	filesUploadLinkedAccountFile  
##### Linked Accounts
	linkedAccountsGetLinkedAccounts  
##### Questions
	questionsAnswerQuestion  
	questionsCreateQuestion  
	questionsGetAnswers  
	questionsGetQuestion  
	questionsGetQuestionsOnObject  
##### Importer
	importerGetInfo  
	importerGetPreview  
	importerImportSpaceContacts  
	importerImportAppItems  
##### Integrations
	integrationsGetAvailableFields  
	integrationsDeleteIntegration  
	integrationsCreateIntegration  
	integrationsGetIntegration  
	integrationsUpdateIntegration  
	integrationsRefreshIntegration  
	integrationsUpdateIntegrationMapping  
##### Reference
	referenceCountUserProfilesWithAccessToObject  
	referenceGetUserProfilesWithAccessToObject  
	referenceGetReference  
	referenceSearchReferences  
##### Recurrence
	recurrenceCreateOrUpdateRecurrence  
	recurrenceDeleteRecurrence  
	recurrenceGetRecurrence  
##### Ratings
	ratingsAddRating  
	ratingsGetAllRatings  
	ratingsGetLikeCount  
	ratingsGetRating  
	ratingsGetRatingOwn  
	ratingsRemoveRating  
	ratingsGetRatings  
	ratingsGetWhoLikedAnObject  
##### Search
	searchSearchGlobally  
	searchSearchInApp  
	searchSearchInOrganization  
	searchSearchInSpace  
##### Reminders
	remindersDeleteReminder  
	remindersCreateOrUpdateReminder  
	remindersGetReminder  
	remindersSnoozeReminder  
##### Space Members
	spaceMembersAddMemberToSpace  
	spaceMembersEndSpaceMemberships  
	spaceMembersGetActiveMembersOfSpace  
	spaceMembersGetEndedMembersOfSpace  
	spaceMembersGetSpaceMember  
	spaceMembersGetTopUsersOnSpace  
	spaceMembersJoinSpace  
	spaceMembersLeaveSpace  
	spaceMembersRequestSpaceMembership  
	spaceMembersUpdateSpaceMemberships  
	spaceMembersAcceptSpaceMembershipRequest  
	spaceMembersGetSpaceMembersByRole  
	spaceMembersGetSpaceMembership  
	spaceMembersGetSpaceMembersV2  
##### Organizations
	organizationsAddNewOrganization  
	organizationsCreateOrganizationAppStoreProfile  
	organizationsAddOrganizationAdmin  
	organizationsDeleteOrganizationMemberRole  
	organizationsDeleteOrganizationAppStoreProfile  
	organizationsGetOrganization  
	organizationsGetOrganizationAppStoreProfile  
	organizationsGetOrganizationBillingProfile  
	organizationsGetOrganizationByUrl  
	organizationsGetOrganizationLoginReport  
	organizationsGetOrganizationMember  
	organizationsGetOrganizations  
	organizationsGetSpaceByUrl  
	organizationsGetSpacesOnOrganization  
	organizationsRemoveOrganizationAdmin  
	organizationsUpdateOrganizationBillingProfile  
	organizationsGetOrganizationAdmins  
	organizationsGetOrganizationStatistics  
	organizationsGetOrganizationMembers  
	organizationsGetSharedOrganizations  
	organizationsGetSpaceMembershipsForOrgMember  
	organizationsUpdateOrganization  
	organizationsUpdateOrganizationAppStoreProfile  
##### Spaces
	spacesCreateSpace  
	spacesGetAvailableSpaces  
	spacesGetSpace  
	spacesGetSpaceByOrgAndUrlLabel  
	spacesGetSpaceByUrl  
	spacesGetTopSpaces  
	spacesUpdateSpace  
##### Stream
	streamGetAppStream  
	streamGetGlobalStream  
	streamGetOrganizationStream  
	streamGetPersonalStream  
	streamGetSpaceStream  
	streamGetStreamObject  
	streamGetUserStream  
##### Subscriptions
	subscriptionsGetSubscriptionById  
	subscriptionsSubscribe  
	subscriptionsGetSubscriptionByReference  
	subscriptionsUnsubscribeById  
	subscriptionsUnsubscribeByReference  
##### Status
	statusAddNewStatusMessage  
	statusUpdateAStatusMessage  
	statusGetStatusMessage  
	statusDeleteAStatusMessage  
##### Tags
	tagsGetObjectsOnAppWithTag  
	tagsGetObjectsOnSpaceWithTag  
	tagsGetObjectsOnOrganizationWithTag  
	tagsCreateTags  
	tagsGetTagsOnApp  
	tagsGetTagsOnAppTop  
	tagsGetTagsOnOrganization  
	tagsGetTagsOnSpace  
	tagsRemoveTag  
	tagsUpdateTags  
##### Views
	viewsCreateView  
	viewsGetView  
	viewsUpdateLastView  
	viewsDeleteView  
	viewsGetViews  
	viewsUpdateView  
##### Tasks
	tasksAssignTask  
	tasksCreateLabel  
	tasksCompleteTask  
	tasksCreateTask  
	tasksCreateTaskWithReference  
	tasksDeleteTask  
	tasksGetTask  
	tasksGetLabels  
	tasksGetTaskCount  
	tasksGetTaskSummaryForOrganization  
	tasksGetTaskSummaryForPersonal  
	tasksGetTaskSummaryForReference  
	tasksGetTaskTotalsByTime  
	tasksGetTaskSummaryForSpace  
	tasksGetTaskTotalsV2  
	tasksGetTasks  
	tasksIncompleteTask  
	tasksRankTask  
	tasksUpdateLabel  
	tasksUpdateTask  
	tasksUpdateTaskDueOn  
	tasksUpdateTaskLabels  
	tasksDeleteLabel  
	tasksGetTaskSummary  
	tasksUpdateTaskText  
	tasksUpdateTaskPrivate  
	tasksGetTasksWithReference  
	tasksRemoveTaskReference  
	tasksUpdateTaskDescription  
	tasksUpdateTaskReference  
##### Users
	usersDeleteUserProperty  
	usersGetNotificationSettings  
	usersGetProfile  
	usersGetProfileField  
	usersGetUserProperty  
	usersSetUserProperties  
	usersGetUserStatus  
	usersSetUserProperty  
	usersUpdateNotificationSetting  
	usersUpdateProfile  
	usersUpdateNotificationSettings  
	usersUpdateProfileField  
	usersGetNotificationSetting  
	usersGetUser  
##### App Market
	appMarketGetCategories  
	appMarketGetOrgsWithPrivateShares  
	appMarketGetOwnShares  
	appMarketGetRecommendedShares  
	appMarketGetShareByReference  
	appMarketInstallShare  
	appMarketGetSharesByCategory  
	appMarketUnshareApp  
	appMarketUpdateShare  
	appMarketShareApp  
##### Contacts
	contactsCreateSpaceContact  
	contactsGetContactField  
	contactsDeleteContact(s)  
	contactsGetContactTotals  
	contactsGetContactTotals(v3)  
	contactsGetContact(s)  
	contactsGetContacts  
	contactsGetLinkedAccountContacts  
	contactsGetOrganizationContacts  
	contactsGetSkills  
	contactsGetTotalSpaceContactsOnSpace  
	contactsGetSpaceContactTotals  
	contactsGetUserContact  
	contactsGetTopContacts  
	contactsUpdateContactField  
	contactsGetUserContactField  
	contactsGetLinkedAccountContact  
	contactsGetVcard  
	contactsGetSpaceContacts  
	contactsUpdateContact  
##### Widgets
	widgetsCreateWidget  
	widgetsDeleteWidget  
	widgetsGetWidget  
	widgetsGetWidgets  
	widgetsUpdateWidgetOrder  
	widgetsUpdateWidget  
##### Items
	itemsCalculate  
	itemsDeleteItem  
	itemsBulkDeleteItems  
	itemsFilterItemsByView  
	itemsExportItems  
	itemsFilterItems  
	itemsCloneItem  
	itemsDeleteItemReference  
	itemsGetAppValues  
	itemsGetFieldRanges  
	itemsGetItem  
	itemsGetItemBasic  
	itemsGetItemCount  
	itemsGetItemFieldValues  
	itemsGetItemByExternalId  
	itemsGetItemPreviewForFieldReference  
	itemsGetItemReferences  
	itemsGetItemRevision  
	itemsAddNewItem  
	itemsGetItemRevisions  
	itemsGetItemValues  
	itemsGetItems  
	itemsGetItemsAsXlsx  
	itemsGetReferencesToItemByField  
	itemsGetMeetingUrl  
	itemsGetTopValuesForField  
	itemsRevertItemRevision  
	itemsSetParticipation  
	itemsFindReferenceableItems  
	itemsUpdateItem  
	itemsUpdateItemValues  
	itemsGetItemRevisionDifference  
	itemsUpdateItemFieldValues  
	itemsUpdateItemReference  
##### Oauth Authorization
	oauthAuthorizationInvalidateTokens  
	oauthAuthorizationGetAccessToken  
	oauthAuthorizationInvalidateGrant  
