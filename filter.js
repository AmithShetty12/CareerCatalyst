const filter=(data)=>{
    let i=0,j=0;
    
    for(i=0;i<data.length;i++){
        if('`'==data[i] &&'`'==data[i+1] &&'`'==data[i+2] ){
           {
            i=i+2;
                    for(i=i;i<data.length;i++)
                        if(data[i]==`\n`){
                            break;
                        }
                    break;
                }
        }
    
    }
    for(j=data.length;j>=0;j--){
       if('`'==data[j] && '`'==data[j-1] && '`'==data[j-2] )
       {
        j=j-2;
        break;
       }
    
    
    }
    if(i>=data.length-1 && j<=1){
        
        return data;
    }else{
    
    return(data.substring(i+1,j));
    }
    
    }
const filter2=(data)=>{
    
        let modifiedData = "";
        
        for (let i=0;i<data.length;i++) {
            if (data[i] === "*") {
                if( data[i+1] === "*"){
                i=i+1;
                }else{
                    modifiedData += '‣';
                }
            }else if(data[i] === "#" && data[i+1] === "#"){
                i=i+1;
            }
             else {
                modifiedData += data[i];
            }
        }
        return modifiedData;
    }
    const filter3=(data)=>{
        let modifiedData = "";
        
        for (let i=0;i<data.length;i++) {
            if (data[i] === "*" && data[i+1] === "*") {
                i=i+1;
                }
             else {
                modifiedData += data[i];
            }
        }
        return modifiedData;
    }

   

    // Your data
    
    
    // Applying the filter
 

    

    
    export { filter,filter2,filter3}