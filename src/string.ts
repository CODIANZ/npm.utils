export function anyToString(a: any){
  try{
    if(a instanceof Error){
      return JSON.stringify(
        {
          name: a.name,
          message: a.message,
          stack: a.stack
        },
        null,
        1
      );
    }
    switch(typeof a){
      case "number":    return a.toString();
      case "bigint":    return a.toString();
      case "boolean":   return a.toString();
      case "function":  return "(function)";
      case "symbol":    return "(symbol)";
      case "undefined": return "(undefined)";
      case "string" :   return `"${a}"`;
      case "object": {
        if(a === null) return "(null)";
        else {
          return JSON.stringify(a);
        }
      }
    }
  }
  catch {
    return "(unknown)";
  }
}

export function numberToCommaSeparatedString(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
