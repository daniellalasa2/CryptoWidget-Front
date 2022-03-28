export default (obj,accessChain,defaultValue=null)=>{
    try{
        if(typeof obj === "object" && Object.keys(obj).length > 0 && accessChain.length > 0){
            accessChain = accessChain.split(".");
            let lastVal = obj;
            let cntr = 0;
            do{
                lastVal = lastVal[accessChain[cntr]];
                cntr++;
            }while(cntr < accessChain.length);
            return lastVal ? lastVal : defaultValue;
        }
    }catch(err){}
    return defaultValue;
}
