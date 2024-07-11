const API={
   //authconfig api
   authConfig:"/generate-auth-token",
   //login api
   postlogin:"/login",
   //file type api's
   postfileType:"/file-type",
   getfileType:"/file-type",
   updatefileType:"/file-type",
   //variable api's
   postVariable:"/Variable-Dictonary",
   getVariable:"/Variable-Dictonary",
   updateVariable:"/Variable-Dictonary",
   //client master api's
   postClientMaster:"/client-master",
   getClientMaster:"/client-master",
   putClientMaster:"/client-master",
   //template type master api's
   posttemplatetypemaster :"/template-type",
   gettemplatetypemaster:"/template-type",
   updatetemplatetypemaster:"/template-type",
   //template master api's
   gettemplatemaster:"/template-master",
   posttemplatemaster:"/template-master",
   updatetemplatemaster:"/template-master",
   //variableMasterApi
   postTemplateVariableMaster:"/template-variable",
   updateTemplateVariableMaster:"/template-variable",
   getTemplateVariableMaster:"/template-variable",
   //documentVaultApi
   getDocumentVault:"/document-vault"

}
export default API;