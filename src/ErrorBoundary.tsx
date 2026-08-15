import React from "react";

export class ErrorBoundary extends React.Component<React.PropsWithChildren, {error: Error | null}> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui",background:"#f8fafc",color:"#0f172a"}}>
          <div style={{maxWidth:680,width:"100%",background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:24,boxShadow:"0 10px 30px rgba(15,23,42,.08)"}}>
            <h1 style={{marginTop:0}}>SMK Tunas Media</h1>
            <p>Aplikasi mengalami kesalahan saat memuat.</p>
            <pre style={{whiteSpace:"pre-wrap",background:"#f1f5f9",padding:12,borderRadius:10,overflow:"auto"}}>{this.state.error.message}</pre>
            <button onClick={() => location.reload()} style={{padding:"10px 16px",border:0,borderRadius:10,cursor:"pointer"}}>Muat ulang</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
