const API={
   //authconfig api
   authConfig:"/generate-auth-token",
   //login api
   postlogin:"/login",
   //file type api's
   postfileType:"/file-type",
   getfileType:"/file-type",
   updatefileType:"/file-type-update",
   //variable api's
   postVariable:"/Variable-Dictonary",
   getVariable:"/Variable-Dictonary",
   updateVariable:"/Variable-Dictonary-update",
   //client master api's
   postClientMaster:"/client-master",
   getClientMaster:"/client-master",
   updateClientMaster:"/client-master-update",
   //template type master api's
   posttemplatetypemaster :"/template-type",
   gettemplatetypemaster:"/template-type",
   updatetemplatetypemaster:"/template-type-update",
   //template master api's
   gettemplatemaster:"/template-master",
   posttemplatemaster:"/template-master",
   updatetemplatemaster:"/template-master-update",
   //variableMasterApi
   postTemplateVariableMaster:"/template-variable",
   updateTemplateVariableMaster:"/template-variable-update",
   getTemplateVariableMaster:"/template-variable",
   //documentVaultApi
   getDocumentVault:"/document-vault"

}
export default API;