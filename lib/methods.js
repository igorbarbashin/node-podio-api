module.exports = {
  "calendar": {
    "calendarGetAppCalendar": {
      "path": "/calendar/app/{app_id}/"
    },
    "calendarGetCalendarSummary": {
      "path": "/calendar/summary"
    },
    "calendarGetExportByRef": {
      "path": "/calendar/export/linked_account/{linked_account_id}/{ref_type}/{ref_id}"
    },
    "calendarGetCalendarSummaryForSpace": {
      "path": "/calendar/space/{space_id}/summary"
    },
    "calendarGetGlobalCalendar": {
      "path": "/calendar/"
    },
    "calendarGetGlobalExport": {
      "path": "/calendar/export/linked_account/{linked_account_id}"
    },
    "calendarGetGlobalCalendarAsIcal": {
      "path": "/calendar/ics/{user_id}/{token}/"
    },
    "calendarGetExportsByReference": {
      "path": "/calendar/export/{ref_type}/{ref_id}/"
    },
    "calendarGetGlobalExports": {
      "path": "/calendar/export/"
    },
    "calendarGetItemFieldCalendarAsIcal": {
      "path": "/calendar/item/{item_id}/field/{field_id}/ics/"
    },
    "calendarGetMutesInGlobalCalendar": {
      "path": "/calendar/mute/"
    },
    "calendarGetSpaceCalendar": {
      "path": "/calendar/space/{space_id}/"
    },
    "calendarGetTaskCalendarAsIcal": {
      "path": "/calendar/task/{task_id}/ics/"
    },
    "calendarSetReferenceExport": {
      "path": "/calendar/export/linked_account/{linked_account_id}/{ref_type}/{ref_id}",
      "method": "PUT"
    },
    "calendarStopReferenceExport": {
      "path": "/calendar/export/linked_account/{linked_account_id}/{ref_type}/{ref_id}",
      "method": "DELETE"
    },
    "calendarGetAppCalendarAsIcal": {
      "path": "/calendar/app/{app_id}/ics/{user_id}/{token}/"
    },
    "calendarGetCalendarSummaryForPersonal": {
      "path": "/calendar/personal/summary"
    },
    "calendarGetSpaceCalendarAsIcal": {
      "path": "/calendar/space/{space_id}/ics/{user_id}/{token}/"
    }
  },
  "email": {
    "emailExportEmailContactForReferenceToLinkedAccount": {
      "path": "/email/contact/{name}/{ref_type}/{ref_id}/export",
      "method": "POST"
    },
    "emailExportGlobalEmailContactToLinkedAccount": {
      "path": "/email/contact/{name}/export",
      "method": "POST"
    },
    "emailGetAppEmailConfiguration": {
      "path": "/email/app/{app_id}"
    },
    "emailGetEmailContactForReferenceAsVcard": {
      "path": "/email/contact/{name}/{ref_type}/{ref_id}/vcard"
    },
    "emailGetGlobalContact": {
      "path": "/email/contact/{name}"
    },
    "emailGetGroups": {
      "path": "/email/group/"
    },
    "emailGetGlobalEmailContactAsVcard": {
      "path": "/email/contact/{name}/vcard"
    },
    "emailUnsubscribeFromAll": {
      "path": "/email/unsubscribe/{username}",
      "method": "POST"
    },
    "emailUpdateAppEmailConfiguration": {
      "path": "/email/app/{app_id}",
      "method": "PUT"
    },
    "emailGetEmailContactForReference": {
      "path": "/email/contact/{name}/{ref_type}/{ref_id}"
    },
    "emailUpdateGroups": {
      "path": "/email/group/",
      "method": "PUT"
    }
  },
  "actions": {
    "actionsGetAction": {
      "path": "/action/{action_id}"
    }
  },
  "batch": {
    "batchGetBatch": {
      "path": "/batch/{batch_id}"
    },
    "batchGetBatches": {
      "path": "/batch/"
    },
    "batchGetRunningBatches": {
      "path": "/batch/{ref_type}/{ref_id}/{plugin}/running/"
    }
  },
  "bulletins": {
    "bulletinsGetBulletin": {
      "path": "/bulletin/{bulletin_id}"
    },
    "bulletinsGetBulletins": {
      "path": "/bulletin/"
    }
  },
  "embeds": {
    "embedsAddAnEmbed": {
      "path": "/embed/",
      "method": "POST"
    }
  },
  "conversations": {
    "conversationsAddParticipants": {
      "path": "/conversation/{conversation_id}/participant/",
      "method": "POST"
    },
    "conversationsCreateConversation": {
      "path": "/conversation/",
      "method": "POST"
    },
    "conversationsCreateConversationOnObject": {
      "path": "/conversation/{ref_type}/{ref_id}/",
      "method": "POST"
    },
    "conversationsGetConversation": {
      "path": "/conversation/{conversation_id}"
    },
    "conversationsCreateConversationV2": {
      "path": "/conversation/v2/",
      "method": "POST"
    },
    "conversationsGetConversationEvent": {
      "path": "/conversation/event/{event_id}"
    },
    "conversationsGetConversationEvents": {
      "path": "/conversation/{conversation_id}/event/"
    },
    "conversationsGetConversationsOnObject": {
      "path": "/conversation/{ref_type}/{ref_id}/"
    },
    "conversationsGetFlaggedConversationCounts": {
      "path": "/conversation/{flag}/count"
    },
    "conversationsGetExistingDirectConversation": {
      "path": "/conversation/direct/{user_id}"
    },
    "conversationsGetFlaggedConversations": {
      "path": "/conversation/{flag}/"
    },
    "conversationsMarkConversationAsUnread": {
      "path": "/conversation/{conversation_id}/read",
      "method": "DELETE"
    },
    "conversationsReplyToConversation": {
      "path": "/conversation/{conversation_id}/reply",
      "method": "POST"
    },
    "conversationsUnstarConversation": {
      "path": "/conversation/{conversation_id}/star",
      "method": "DELETE"
    },
    "conversationsSearchConversations": {
      "path": "/conversation/search/"
    },
    "conversationsStarConversation": {
      "path": "/conversation/{conversation_id}/star",
      "method": "POST"
    },
    "conversationsGetConversations": {
      "path": "/conversation/"
    },
    "conversationsMarkAllConversationsAsRead": {
      "path": "/conversation/read",
      "method": "POST"
    },
    "conversationsLeaveConversation": {
      "path": "/conversation/{conversation_id}/leave",
      "method": "POST"
    },
    "conversationsMarkConversationAsRead": {
      "path": "/conversation/{conversation_id}/read",
      "method": "POST"
    }
  },
  "hooks": {
    "hooksCreateHook": {
      "path": "/hook/{ref_type}/{ref_id}/",
      "method": "POST"
    },
    "hooksDeleteHook": {
      "path": "/hook/{hook_id}",
      "method": "DELETE"
    },
    "hooksGetHooks": {
      "path": "/hook/{ref_type}/{ref_id}/"
    },
    "hooksRequestHookVerification": {
      "path": "/hook/{hook_id}/verify/request",
      "method": "POST"
    },
    "hooksValidateHookVerification": {
      "path": "/hook/{hook_id}/verify/validate",
      "method": "POST"
    }
  },
  "devices": {
    "devicesGetDeviceTokens": {
      "path": "/mobile/device_token/"
    },
    "devicesRegisterMobileDevice": {
      "path": "/mobile/push/{device_token}",
      "method": "POST"
    },
    "devicesUnregisterMobileDevice": {
      "path": "/mobile/push/{device_token}",
      "method": "DELETE"
    },
    "devicesInstallAppOnMobileDevice": {
      "path": "/mobile/install_app/{app_id}",
      "method": "POST"
    }
  },
  "applications": {
    "applicationsActivateApp": {
      "path": "/app/{app_id}/activate",
      "method": "POST"
    },
    "applicationsAddNewApp": {
      "path": "/app/",
      "method": "POST"
    },
    "applicationsAddNewAppField": {
      "path": "/app/{app_id}/field/",
      "method": "POST"
    },
    "applicationsDeactivateApp": {
      "path": "/app/{app_id}/deactivate",
      "method": "POST"
    },
    "applicationsDeleteAppField": {
      "path": "/app/{app_id}/field/{field_id}",
      "method": "DELETE"
    },
    "applicationsDeleteApp": {
      "path": "/app/{app_id}",
      "method": "DELETE"
    },
    "applicationsGetAppDependencies": {
      "path": "/app/{app_id}/dependencies/"
    },
    "applicationsGetAllUserApps": {
      "path": "/app/v2/"
    },
    "applicationsGetAppOnSpaceByUrlLabel": {
      "path": "/app/space/{space_id}/{url_label}"
    },
    "applicationsGetAppField": {
      "path": "/app/{app_id}/field/{field_id}"
    },
    "applicationsGetApp": {
      "path": "/app/{app_id}"
    },
    "applicationsGetCalculationsForApp": {
      "path": "/app/{app_id}/calculation/"
    },
    "applicationsGetAppsAvailableForSpace": {
      "path": "/app/space/{space_id}/available/"
    },
    "applicationsGetAppsBySpace": {
      "path": "/app/space/{space_id}/"
    },
    "applicationsGetFeatures": {
      "path": "/app/features/"
    },
    "applicationsGetTopApps": {
      "path": "/app/top/"
    },
    "applicationsGetSpaceAppDependencies": {
      "path": "/app/space/{space_id}/dependencies/"
    },
    "applicationsInstallApp": {
      "path": "/app/{app_id}/install",
      "method": "POST"
    },
    "applicationsGetTopAppsForOrganization": {
      "path": "/app/org/{org_id}/top/"
    },
    "applicationsUpdateAnAppField": {
      "path": "/app/{app_id}/field/{field_id}",
      "method": "PUT"
    },
    "applicationsUpdateApp": {
      "path": "/app/{app_id}",
      "method": "PUT"
    },
    "applicationsUpdateAppDescription": {
      "path": "/app/{app_id}/description",
      "method": "PUT"
    },
    "applicationsUpdateAppOrder": {
      "path": "/app/space/{space_id}/order",
      "method": "PUT"
    },
    "applicationsUpdateAppUsageInstructions": {
      "path": "/app/{app_id}/usage",
      "method": "PUT"
    }
  },
  "comments": {
    "commentsAddCommentToObject": {
      "path": "/comment/{type}/{id}/",
      "method": "POST"
    },
    "commentsDeleteAComment": {
      "path": "/comment/{comment_id}",
      "method": "DELETE"
    },
    "commentsGetCommentsOnObject": {
      "path": "/comment/{type}/{id}/"
    },
    "commentsUpdateAComment": {
      "path": "/comment/{comment_id}",
      "method": "PUT"
    },
    "commentsGetAComment": {
      "path": "/comment/{comment_id}"
    }
  },
  "notifications": {
    "notificationsGetInboxNewCount": {
      "path": "/notification/inbox/new/count"
    },
    "notificationsGetNotification": {
      "path": "/notification/{notification_id}"
    },
    "notificationsGetNotificationSettings": {
      "path": "/notification/settings"
    },
    "notificationsMarkAllNotificationsAsViewed": {
      "path": "/notification/viewed",
      "method": "POST"
    },
    "notificationsGetNotifications": {
      "path": "/notification/"
    },
    "notificationsMarkNotificationAsViewed": {
      "path": "/notification/{notification_id}/viewed",
      "method": "POST"
    },
    "notificationsMarkNotificationsAsViewedByRef": {
      "path": "/notification/{ref_type}/{ref_id}/viewed",
      "method": "POST"
    },
    "notificationsUn-starNotification": {
      "path": "/notification/{notification_id}/star",
      "method": "DELETE"
    },
    "notificationsUpdateNotificationSettings": {
      "path": "/notification/settings",
      "method": "PUT"
    },
    "notificationsStarNotification": {
      "path": "/notification/{notification_id}/star",
      "method": "POST"
    }
  },
  "forms": {
    "formsActivateForm": {
      "path": "/form/{form_id}/activate",
      "method": "POST"
    },
    "formsCreateForm": {
      "path": "/form/app/{app_id}/",
      "method": "POST"
    },
    "formsDeactivateForm": {
      "path": "/form/{form_id}/deactivate",
      "method": "POST"
    },
    "formsDeleteFrom": {
      "path": "/form/{form_id}",
      "method": "DELETE"
    },
    "formsGetForm": {
      "path": "/form/{form_id}"
    },
    "formsGetForms": {
      "path": "/form/app/{app_id}/"
    },
    "formsUpdateForm": {
      "path": "/form/{form_id}",
      "method": "PUT"
    }
  },
  "files": {
    "filesAttachFile": {
      "path": "/file/{file_id}/attach",
      "method": "POST"
    },
    "filesCopyFile": {
      "path": "/file/{file_id}/copy",
      "method": "POST"
    },
    "filesDeleteFile": {
      "path": "/file/{file_id}",
      "method": "DELETE"
    },
    "filesGetFile": {
      "path": "/file/{file_id}"
    },
    "filesGetFiles": {
      "path": "/file/"
    },
    "filesGetFilesOnApp": {
      "path": "/file/app/{app_id}/"
    },
    "filesGetLatestFilesOnSpace": {
      "path": "/file/space/{space_id}/latest/"
    },
    "filesGetFilesOnSpace": {
      "path": "/file/space/{space_id}/"
    },
    "filesReplaceFile": {
      "path": "/file/{file_id}/replace",
      "method": "POST"
    },
    "filesUploadFile": {
      "path": "/file/",
      "method": "POST"
    },
    "filesGetLinkedAccountFiles": {
      "path": "/file/linked_account/{linked_account_id}/"
    },
    "filesUpdateFile": {
      "path": "/file/{file_id}",
      "method": "PUT"
    },
    "filesUploadLinkedAccountFile": {
      "path": "/file/linked_account/{linked_account_id}/",
      "method": "POST"
    }
  },
  "linkedAccounts": {
    "linkedAccountsGetLinkedAccounts": {
      "path": "/linked_account/"
    }
  },
  "questions": {
    "questionsAnswerQuestion": {
      "path": "/question/{question_id}/",
      "method": "POST"
    },
    "questionsCreateQuestion": {
      "path": "/question/{ref_type}/{ref_id}/",
      "method": "POST"
    },
    "questionsGetAnswers": {
      "path": "/question/{question_id}/"
    },
    "questionsGetQuestion": {
      "path": "/question/{question_id}"
    },
    "questionsGetQuestionsOnObject": {
      "path": "/question/{ref_type}/{ref_id}/"
    }
  },
  "importer": {
    "importerGetInfo": {
      "path": "/importer/{file_id}/info"
    },
    "importerGetPreview": {
      "path": "/importer/{file_id}/preview/{row}",
      "method": "POST"
    },
    "importerImportSpaceContacts": {
      "path": "/importer/{file_id}/contact/space/{space_id}",
      "method": "POST"
    },
    "importerImportAppItems": {
      "path": "/importer/{file_id}/item/app/{app_id}",
      "method": "POST"
    }
  },
  "integrations": {
    "integrationsGetAvailableFields": {
      "path": "/integration/{app_id}/field/"
    },
    "integrationsDeleteIntegration": {
      "path": "/integration/{app_id}",
      "method": "DELETE"
    },
    "integrationsCreateIntegration": {
      "path": "/integration/{app_id}",
      "method": "POST"
    },
    "integrationsGetIntegration": {
      "path": "/integration/{app_id}"
    },
    "integrationsUpdateIntegration": {
      "path": "/integration/{app_id}",
      "method": "PUT"
    },
    "integrationsRefreshIntegration": {
      "path": "/integration/{app_id}/refresh",
      "method": "POST"
    },
    "integrationsUpdateIntegrationMapping": {
      "path": "/integration/{app_id}/mapping",
      "method": "PUT"
    }
  },
  "reference": {
    "referenceCountUserProfilesWithAccessToObject": {
      "path": "/reference/{ref_type}/{ref_id}/accessible_by/count"
    },
    "referenceGetUserProfilesWithAccessToObject": {
      "path": "/reference/{ref_type}/{ref_id}/accessible_by/"
    },
    "referenceGetReference": {
      "path": "/reference/{ref_type}/{ref_id}"
    },
    "referenceSearchReferences": {
      "path": "/reference/search",
      "method": "POST"
    }
  },
  "recurrence": {
    "recurrenceCreateOrUpdateRecurrence": {
      "path": "/recurrence/{ref_type}/{ref_id}",
      "method": "PUT"
    },
    "recurrenceDeleteRecurrence": {
      "path": "/recurrence/{ref_type}/{ref_id}",
      "method": "DELETE"
    },
    "recurrenceGetRecurrence": {
      "path": "/recurrence/{ref_type}/{ref_id}"
    }
  },
  "ratings": {
    "ratingsAddRating": {
      "path": "/rating/{ref_type}/{ref_id}/{rating_type}",
      "method": "POST"
    },
    "ratingsGetAllRatings": {
      "path": "/rating/{ref_type}/{ref_id}"
    },
    "ratingsGetLikeCount": {
      "path": "/rating/{ref_type}/{ref_id}/like_count"
    },
    "ratingsGetRating": {
      "path": "/rating/{ref_type}/{ref_id}/{rating_type}/{user_id}"
    },
    "ratingsGetRatingOwn": {
      "path": "/rating/{ref_type}/{ref_id}/{rating_type}/self"
    },
    "ratingsRemoveRating": {
      "path": "/rating/{ref_type}/{ref_id}/{rating_type}",
      "method": "DELETE"
    },
    "ratingsGetRatings": {
      "path": "/rating/{ref_type}/{ref_id}/{rating_type}"
    },
    "ratingsGetWhoLikedAnObject": {
      "path": "/rating/{ref_type}/{ref_id}/liked_by/"
    }
  },
  "search": {
    "searchSearchGlobally": {
      "path": "/search/",
      "method": "POST"
    },
    "searchSearchInApp": {
      "path": "/search/app/{app_id}/",
      "method": "POST"
    },
    "searchSearchInOrganization": {
      "path": "/search/org/{org_id}/",
      "method": "POST"
    },
    "searchSearchInSpace": {
      "path": "/search/space/{space_id}/",
      "method": "POST"
    }
  },
  "reminders": {
    "remindersDeleteReminder": {
      "path": "/reminder/{ref_type}/{ref_id}",
      "method": "DELETE"
    },
    "remindersCreateOrUpdateReminder": {
      "path": "/reminder/{ref_type}/{ref_id}",
      "method": "PUT"
    },
    "remindersGetReminder": {
      "path": "/reminder/{ref_type}/{ref_id}"
    },
    "remindersSnoozeReminder": {
      "path": "/reminder/{ref_type}/{ref_id}/snooze",
      "method": "POST"
    }
  },
  "spaceMembers": {
    "spaceMembersAddMemberToSpace": {
      "path": "/space/{space_id}/member/",
      "method": "POST"
    },
    "spaceMembersEndSpaceMemberships": {
      "path": "/space/{space_id}/member/{user_ids}",
      "method": "DELETE"
    },
    "spaceMembersGetActiveMembersOfSpace": {
      "path": "/space/{space_id}/member/"
    },
    "spaceMembersGetEndedMembersOfSpace": {
      "path": "/space/{space_id}/member/ended/"
    },
    "spaceMembersGetSpaceMember": {
      "path": "/space/{space_id}/member/{user_id}/v2"
    },
    "spaceMembersGetTopUsersOnSpace": {
      "path": "/space/{space_id}/member/top/"
    },
    "spaceMembersJoinSpace": {
      "path": "/space/{space_id}/join",
      "method": "POST"
    },
    "spaceMembersLeaveSpace": {
      "path": "/space/{space_id}/leave",
      "method": "POST"
    },
    "spaceMembersRequestSpaceMembership": {
      "path": "/space/{space_id}/member_request/",
      "method": "POST"
    },
    "spaceMembersUpdateSpaceMemberships": {
      "path": "/space/{space_id}/member/{user_ids}",
      "method": "PUT"
    },
    "spaceMembersAcceptSpaceMembershipRequest": {
      "path": "/space/{space_id}/member_request/{space_member_request_id}/accept",
      "method": "POST"
    },
    "spaceMembersGetSpaceMembersByRole": {
      "path": "/space/{space_id}/member/{role}/"
    },
    "spaceMembersGetSpaceMembership": {
      "path": "/space/{space_id}/member/{user_id}"
    },
    "spaceMembersGetSpaceMembersV2": {
      "path": "/space/{space_id}/member/v2/"
    }
  },
  "organizations": {
    "organizationsAddNewOrganization": {
      "path": "/org/",
      "method": "POST"
    },
    "organizationsCreateOrganizationAppStoreProfile": {
      "path": "/org/{org_id}/appstore",
      "method": "POST"
    },
    "organizationsAddOrganizationAdmin": {
      "path": "/org/{org_id}/admin/",
      "method": "POST"
    },
    "organizationsDeleteOrganizationMemberRole": {
      "path": "/org/{org_id}/member/{user_id}/role",
      "method": "DELETE"
    },
    "organizationsDeleteOrganizationAppStoreProfile": {
      "path": "/org/{org_id}/appstore",
      "method": "DELETE"
    },
    "organizationsGetOrganization": {
      "path": "/org/{org_id}"
    },
    "organizationsGetOrganizationAppStoreProfile": {
      "path": "/org/{org_id}/appstore"
    },
    "organizationsGetOrganizationBillingProfile": {
      "path": "/org/{org_id}/billing"
    },
    "organizationsGetOrganizationByUrl": {
      "path": "/org/url"
    },
    "organizationsGetOrganizationLoginReport": {
      "path": "/org/{org_id}/report/login/"
    },
    "organizationsGetOrganizationMember": {
      "path": "/org/{org_id}/member/{user_id}"
    },
    "organizationsGetOrganizations": {
      "path": "/org/"
    },
    "organizationsGetSpaceByUrl": {
      "path": "/org/{org_id}/space/url/{url}"
    },
    "organizationsGetSpacesOnOrganization": {
      "path": "/org/{org_id}/space/"
    },
    "organizationsRemoveOrganizationAdmin": {
      "path": "/org/{org_id}/admin/{user_id}",
      "method": "DELETE"
    },
    "organizationsUpdateOrganizationBillingProfile": {
      "path": "/org/{org_id}/billing",
      "method": "PUT"
    },
    "organizationsGetOrganizationAdmins": {
      "path": "/org/{org_id}/admin/"
    },
    "organizationsGetOrganizationStatistics": {
      "path": "/org/{org_id}/statistics"
    },
    "organizationsGetOrganizationMembers": {
      "path": "/org/{org_id}/member/"
    },
    "organizationsGetSharedOrganizations": {
      "path": "/org/shared/{user_id}"
    },
    "organizationsGetSpaceMembershipsForOrgMember": {
      "path": "/org/{org_id}/member/{user_id}/space_member/"
    },
    "organizationsUpdateOrganization": {
      "path": "/org/{org_id}",
      "method": "PUT"
    },
    "organizationsUpdateOrganizationAppStoreProfile": {
      "path": "/org/{org_id}/appstore",
      "method": "PUT"
    }
  },
  "spaces": {
    "spacesCreateSpace": {
      "path": "/space/",
      "method": "POST"
    },
    "spacesGetAvailableSpaces": {
      "path": "/space/org/{org_id}/available/"
    },
    "spacesGetSpace": {
      "path": "/space/{space_id}"
    },
    "spacesGetSpaceByOrgAndUrlLabel": {
      "path": "/space/org/{org_id}/{url_label}"
    },
    "spacesGetSpaceByUrl": {
      "path": "/space/url"
    },
    "spacesGetTopSpaces": {
      "path": "/space/top/"
    },
    "spacesUpdateSpace": {
      "path": "/space/{space_id}",
      "method": "PUT"
    }
  },
  "stream": {
    "streamGetAppStream": {
      "path": "/stream/app/{app_id}/"
    },
    "streamGetGlobalStream": {
      "path": "/stream/"
    },
    "streamGetOrganizationStream": {
      "path": "/stream/org/{org_id}/"
    },
    "streamGetPersonalStream": {
      "path": "/stream/personal/"
    },
    "streamGetSpaceStream": {
      "path": "/stream/space/{space_id}/"
    },
    "streamGetStreamObject": {
      "path": "/stream/{ref_type}/{ref_id}"
    },
    "streamGetUserStream": {
      "path": "/stream/user/{user_id}/"
    }
  },
  "subscriptions": {
    "subscriptionsGetSubscriptionById": {
      "path": "/subscription/{subscription_id}"
    },
    "subscriptionsSubscribe": {
      "path": "/subscription/{ref_type}/{ref_id}",
      "method": "POST"
    },
    "subscriptionsGetSubscriptionByReference": {
      "path": "/subscription/{ref_type}/{ref_id}"
    },
    "subscriptionsUnsubscribeById": {
      "path": "/subscription/{subscription_id}",
      "method": "DELETE"
    },
    "subscriptionsUnsubscribeByReference": {
      "path": "/subscription/{ref_type}/{ref_id}",
      "method": "DELETE"
    }
  },
  "status": {
    "statusAddNewStatusMessage": {
      "path": "/status/space/{space_id}/",
      "method": "POST"
    },
    "statusUpdateAStatusMessage": {
      "path": "/status/{status_id}",
      "method": "PUT"
    },
    "statusGetStatusMessage": {
      "path": "/status/{status_id}"
    },
    "statusDeleteAStatusMessage": {
      "path": "/status/{status_id}",
      "method": "DELETE"
    }
  },
  "tags": {
    "tagsGetObjectsOnAppWithTag": {
      "path": "/tag/app/{app_id}/search/"
    },
    "tagsGetObjectsOnSpaceWithTag": {
      "path": "/tag/space/{space_id}/search/"
    },
    "tagsGetObjectsOnOrganizationWithTag": {
      "path": "/tag/org/{org_id}/search/"
    },
    "tagsCreateTags": {
      "path": "/tag/{ref_type}/{ref_id}/",
      "method": "POST"
    },
    "tagsGetTagsOnApp": {
      "path": "/tag/app/{app_id}/"
    },
    "tagsGetTagsOnAppTop": {
      "path": "/tag/app/{app_id}/top/"
    },
    "tagsGetTagsOnOrganization": {
      "path": "/tag/org/{org_id}/"
    },
    "tagsGetTagsOnSpace": {
      "path": "/tag/space/{space_id}/"
    },
    "tagsRemoveTag": {
      "path": "/tag/{ref_type}/{ref_id}/",
      "method": "DELETE"
    },
    "tagsUpdateTags": {
      "path": "/tag/{ref_type}/{ref_id}/",
      "method": "PUT"
    }
  },
  "views": {
    "viewsCreateView": {
      "path": "/view/app/{app_id}/",
      "method": "POST"
    },
    "viewsGetView": {
      "path": "/view/app/{app_id}/{view_id_or_name}"
    },
    "viewsUpdateLastView": {
      "path": "/view/app/{app_id}/last",
      "method": "PUT"
    },
    "viewsDeleteView": {
      "path": "/view/{view_id}",
      "method": "DELETE"
    },
    "viewsGetViews": {
      "path": "/view/app/{app_id}/"
    },
    "viewsUpdateView": {
      "path": "/view/{view_id}",
      "method": "PUT"
    }
  },
  "tasks": {
    "tasksAssignTask": {
      "path": "/task/{task_id}/assign",
      "method": "POST"
    },
    "tasksCreateLabel": {
      "path": "/task/label/",
      "method": "POST"
    },
    "tasksCompleteTask": {
      "path": "/task/{task_id}/complete",
      "method": "POST"
    },
    "tasksCreateTask": {
      "path": "/task/",
      "method": "POST"
    },
    "tasksCreateTaskWithReference": {
      "path": "/task/{ref_type}/{ref_id}/",
      "method": "POST"
    },
    "tasksDeleteTask": {
      "path": "/task/{task_id}",
      "method": "DELETE"
    },
    "tasksGetTask": {
      "path": "/task/{task_id}"
    },
    "tasksGetLabels": {
      "path": "/task/label/"
    },
    "tasksGetTaskCount": {
      "path": "/task/{ref_type}/{ref_id}/count"
    },
    "tasksGetTaskSummaryForOrganization": {
      "path": "/task/org/{org_id}/summary"
    },
    "tasksGetTaskSummaryForPersonal": {
      "path": "/task/personal/summary"
    },
    "tasksGetTaskSummaryForReference": {
      "path": "/task/{ref_type}/{ref_id}/summary"
    },
    "tasksGetTaskTotalsByTime": {
      "path": "/task/total/{time}"
    },
    "tasksGetTaskSummaryForSpace": {
      "path": "/task/space/{space_id}/summary"
    },
    "tasksGetTaskTotalsV2": {
      "path": "/task/total/"
    },
    "tasksGetTasks": {
      "path": "/task/"
    },
    "tasksIncompleteTask": {
      "path": "/task/{task_id}/incomplete",
      "method": "POST"
    },
    "tasksRankTask": {
      "path": "/task/{task_id}/rank",
      "method": "POST"
    },
    "tasksUpdateLabel": {
      "path": "/task/label/{label_id}",
      "method": "PUT"
    },
    "tasksUpdateTask": {
      "path": "/task/{task_id}",
      "method": "PUT"
    },
    "tasksUpdateTaskDueOn": {
      "path": "/task/{task_id}/due",
      "method": "PUT"
    },
    "tasksUpdateTaskLabels": {
      "path": "/task/{task_id}/label/",
      "method": "PUT"
    },
    "tasksDeleteLabel": {
      "path": "/task/label/{label_id}",
      "method": "DELETE"
    },
    "tasksGetTaskSummary": {
      "path": "/task/summary"
    },
    "tasksUpdateTaskText": {
      "path": "/task/{task_id}/text",
      "method": "PUT"
    },
    "tasksUpdateTaskPrivate": {
      "path": "/task/{task_id}/private",
      "method": "PUT"
    },
    "tasksGetTasksWithReference": {
      "path": "/task/{ref_type}/{ref_id}/"
    },
    "tasksRemoveTaskReference": {
      "path": "/task/{task_id}/ref",
      "method": "DELETE"
    },
    "tasksUpdateTaskDescription": {
      "path": "/task/{task_id}/description",
      "method": "PUT"
    },
    "tasksUpdateTaskReference": {
      "path": "/task/{task_id}/ref",
      "method": "PUT"
    }
  },
  "users": {
    "usersDeleteUserProperty": {
      "path": "/user/property/{name}",
      "method": "DELETE"
    },
    "usersGetNotificationSettings": {
      "path": "/user/setting/{client_type}/"
    },
    "usersGetProfile": {
      "path": "/user/profile/"
    },
    "usersGetProfileField": {
      "path": "/user/profile/{key}"
    },
    "usersGetUserProperty": {
      "path": "/user/property/{name}"
    },
    "usersSetUserProperties": {
      "path": "/user/property/",
      "method": "PUT"
    },
    "usersGetUserStatus": {
      "path": "/user/status"
    },
    "usersSetUserProperty": {
      "path": "/user/property/{name}",
      "method": "PUT"
    },
    "usersUpdateNotificationSetting": {
      "path": "/user/setting/{client_type}/{notification_type}",
      "method": "PUT"
    },
    "usersUpdateProfile": {
      "path": "/user/profile/",
      "method": "PUT"
    },
    "usersUpdateNotificationSettings": {
      "path": "/user/setting/{client_type}/",
      "method": "PUT"
    },
    "usersUpdateProfileField": {
      "path": "/user/profile/{key}",
      "method": "PUT"
    },
    "usersGetNotificationSetting": {
      "path": "/user/setting/{client_type}/{notification_type}"
    },
    "usersGetUser": {
      "path": "/user"
    }
  },
  "appMarket": {
    "appMarketGetCategories": {
      "path": "/app_store/category/"
    },
    "appMarketGetOrgsWithPrivateShares": {
      "path": "/app_store/org/"
    },
    "appMarketGetOwnShares": {
      "path": "/app_store/own/"
    },
    "appMarketGetRecommendedShares": {
      "path": "/app_store/recommended/{area}/"
    },
    "appMarketGetShareByReference": {
      "path": "/app_store/{ref_type}/{ref_id}/"
    },
    "appMarketInstallShare": {
      "path": "/app_store/{share_id}/install",
      "method": "POST"
    },
    "appMarketGetSharesByCategory": {
      "path": "/app_store/category/{category_id}/"
    },
    "appMarketUnshareApp": {
      "path": "/app_store/{share_id}",
      "method": "DELETE"
    },
    "appMarketUpdateShare": {
      "path": "/app_store/{share_id}",
      "method": "PUT"
    },
    "appMarketShareApp": {
      "path": "/app_store/",
      "method": "POST"
    }
  },
  "contacts": {
    "contactsCreateSpaceContact": {
      "path": "/contact/space/{space_id}/",
      "method": "POST"
    },
    "contactsGetContactField": {
      "path": "/contact/{profile_id}/{key}/v2"
    },
    "contactsDeleteContact(s)": {
      "path": "/contact/{profile_ids}",
      "method": "DELETE"
    },
    "contactsGetContactTotals": {
      "path": "/contact/totals/"
    },
    "contactsGetContactTotals(v3)": {
      "path": "/contact/totals/v3/"
    },
    "contactsGetContact(s)": {
      "path": "/contact/{profile_ids}/v2"
    },
    "contactsGetContacts": {
      "path": "/contact/"
    },
    "contactsGetLinkedAccountContacts": {
      "path": "/contact/linked_account/{linked_account_id}"
    },
    "contactsGetOrganizationContacts": {
      "path": "/contact/org/{org_id}"
    },
    "contactsGetSkills": {
      "path": "/contact/skill/"
    },
    "contactsGetTotalSpaceContactsOnSpace": {
      "path": "/contact/space/{space_id}/totals/space"
    },
    "contactsGetSpaceContactTotals": {
      "path": "/contact/space/{space_id}/totals/"
    },
    "contactsGetUserContact": {
      "path": "/contact/user/{user_id}"
    },
    "contactsGetTopContacts": {
      "path": "/contact/top/"
    },
    "contactsUpdateContactField": {
      "path": "/contact/{profile_id}/{key}",
      "method": "PUT"
    },
    "contactsGetUserContactField": {
      "path": "/contact/user/{user_id}/{key}"
    },
    "contactsGetLinkedAccountContact": {
      "path": "/contact/linked_account/{linked_account_id}",
      "method": "POST"
    },
    "contactsGetVcard": {
      "path": "/contact/{profile_id}/vcard"
    },
    "contactsGetSpaceContacts": {
      "path": "/contact/space/{space_id}/"
    },
    "contactsUpdateContact": {
      "path": "/contact/{profile_id}",
      "method": "PUT"
    }
  },
  "widgets": {
    "widgetsCreateWidget": {
      "path": "/widget/{ref_type}/{ref_id}/",
      "method": "POST"
    },
    "widgetsDeleteWidget": {
      "path": "/widget/{widget_id}",
      "method": "DELETE"
    },
    "widgetsGetWidget": {
      "path": "/widget/{widget_id}"
    },
    "widgetsGetWidgets": {
      "path": "/widget/{ref_type}/{ref_id}/"
    },
    "widgetsUpdateWidgetOrder": {
      "path": "/widget/{ref_type}/{ref_id}/order",
      "method": "PUT"
    },
    "widgetsUpdateWidget": {
      "path": "/widget/{widget_id}",
      "method": "PUT"
    }
  },
  "items": {
    "itemsCalculate": {
      "path": "/item/app/{app_id}/calculate",
      "method": "POST"
    },
    "itemsDeleteItem": {
      "path": "/item/{item_id}",
      "method": "DELETE"
    },
    "itemsBulkDeleteItems": {
      "path": "/item/app/{app_id}/delete",
      "method": "POST"
    },
    "itemsFilterItemsByView": {
      "path": "/item/app/{app_id}/filter/{view_id}/",
      "method": "POST"
    },
    "itemsExportItems": {
      "path": "/item/app/{app_id}/export/{exporter}",
      "method": "POST"
    },
    "itemsFilterItems": {
      "path": "/item/app/{app_id}/filter/",
      "method": "POST"
    },
    "itemsCloneItem": {
      "path": "/item/{item_id}/clone",
      "method": "POST"
    },
    "itemsDeleteItemReference": {
      "path": "/item/{item_id}/ref",
      "method": "DELETE"
    },
    "itemsGetAppValues": {
      "path": "/item/app/{app_id}/values"
    },
    "itemsGetFieldRanges": {
      "path": "/item/field/{field_id}/range"
    },
    "itemsGetItem": {
      "path": "/item/{item_id}"
    },
    "itemsGetItemBasic": {
      "path": "/item/{item_id}/basic"
    },
    "itemsGetItemCount": {
      "path": "/item/app/{app_id}/count"
    },
    "itemsGetItemFieldValues": {
      "path": "/item/{item_id}/value/{field_id}"
    },
    "itemsGetItemByExternalId": {
      "path": "/item/app/{app_id}/external_id/{external_id}"
    },
    "itemsGetItemPreviewForFieldReference": {
      "path": "/item/{item_id}/reference/{field_id}/preview"
    },
    "itemsGetItemReferences": {
      "path": "/item/{item_id}/reference/"
    },
    "itemsGetItemRevision": {
      "path": "/item/{item_id}/revision/{revision}"
    },
    "itemsAddNewItem": {
      "path": "/item/app/{app_id}/",
      "method": "POST"
    },
    "itemsGetItemRevisions": {
      "path": "/item/{item_id}/revision/"
    },
    "itemsGetItemValues": {
      "path": "/item/{item_id}/value"
    },
    "itemsGetItems": {
      "path": "/item/app/{app_id}/"
    },
    "itemsGetItemsAsXlsx": {
      "path": "/item/app/{app_id}/xlsx/"
    },
    "itemsGetReferencesToItemByField": {
      "path": "/item/{item_id}/reference/field/{field_id}"
    },
    "itemsGetMeetingUrl": {
      "path": "/item/{item_id}/meeting/url"
    },
    "itemsGetTopValuesForField": {
      "path": "/item/field/{field_id}/top/"
    },
    "itemsRevertItemRevision": {
      "path": "/item/{item_id}/revision/{revision}",
      "method": "DELETE"
    },
    "itemsSetParticipation": {
      "path": "/item/{item_id}/participation",
      "method": "PUT"
    },
    "itemsFindReferenceableItems": {
      "path": "/item/field/{field_id}/find"
    },
    "itemsUpdateItem": {
      "path": "/item/{item_id}",
      "method": "PUT"
    },
    "itemsUpdateItemValues": {
      "path": "/item/{item_id}/value",
      "method": "PUT"
    },
    "itemsGetItemRevisionDifference": {
      "path": "/item/{item_id}/revision/{revision_from}/{revision_to}"
    },
    "itemsUpdateItemFieldValues": {
      "path": "/item/{item_id}/value/{field_or_external_id}",
      "method": "PUT"
    },
    "itemsUpdateItemReference": {
      "path": "/item/{item_id}/ref",
      "method": "PUT"
    }
  },
  "oauthAuthorization": {
    "oauthAuthorizationInvalidateTokens": {
      "path": "/oauth/token/invalidate",
      "method": "POST"
    },
    "oauthAuthorizationGetAccessToken": {
      "path": "/oauth/token",
      "method": "POST"
    },
    "oauthAuthorizationInvalidateGrant": {
      "path": "/oauth/grant/invalidate",
      "method": "POST"
    }
  }
}
