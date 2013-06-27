module.exports = { 

    appActivate: {
        method: "POST",
        path:  "/app/{app_id}/activate"
    },

    appAddNew: {
        method: "POST",
        path:  "/app/"
    },

    appAddNewField: {
        method: "POST",
        path:  "/app/{app_id}/field/"
    },

    appDeactivate: {
        method: "POST",
        path:  "/app/{app_id}/deactivate"
    },

    appDelete : {
        method: "DELETE",
        path: "/app/{app_id}"
    },

    appDeleteField: {
        method: "DELETE",
        path: "/app/{app_id}/field/{field_id}"
    },

    appGetAllUserApps:          { path: "/app/v2" },
    appGet:                     { path: "/app/{app_id}" },
    appGetDependencies:         { path: "/app/{app_id}/dependencies/" },
    appGetField:                { path: "/app/{app_id}/field/{field_id}" },
    appGetOnSpaceByURL:         { path: "/app/space/{space_id}/{url_label}" },
    appGetAvailableForSpace:    { path: "/app/space/{space_id}/available/" },
    appGetBySpace:              { path: "/app/space/{space_id}/" },
    appGetCalculations:         { path: "/app/{app_id}/calculation/" },
    appGetFeatures:             { path: "/app/features/" },
    appGetSpaceDependencies:    { path: "/app/space/{space_id}/dependencies/" },
    appGetTop:                  { path: "/app/top/" },
    appGetTopForOrganization:   { path: "/app/org/{org_id}/top/" },

    appInstall: {
        method: "POST",
        path:   "/app/{app_id}/install"
    },

    appUpdateField: {
        method: "PUT",
        path:   "/app/{app_id}/field/{field_id}"
    },

    appUpdate: {
        method: "PUT",
        path:   "/app/{app_id}"
    },

    appUpdateDescription: {
        method: "PUT",
        path:   "/app/{app_id}/description" 
    },

    appUpdateOrder: {
        method: "PUT",
        path:   "/app/space/{space_id}/order"
    },

    appUpdateUsage: {
        method: "PUT",
        path:   "/app/{app_id}/usage"
    }
};
