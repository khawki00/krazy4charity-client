import { ConfigProvider } from "antd"

function ThemeProvider({children} : {
    children: React.ReactNode
}) {
  return (
   <ConfigProvider theme={{
    token:{
        // colorPrimary : '#edd2c3',
        // colorSuccess: '#af5006',
        borderRadius: 2,
        controlOutline: "none",
        

    },

    components: {
        Button :{
            controlHeight : 42,
            colorPrimary: '#af5006'
            
            
        },
        Input: {
            controlHeight: 45,
            
            
           
        },
        InputNumber:{
            controlHeight: 45,
            colorPrimary:"#af5006"
        },
        Select:{
            controlHeight: 45,
        },
      
    }
   }}>
    {children}
    </ConfigProvider>
  )
}

export default ThemeProvider