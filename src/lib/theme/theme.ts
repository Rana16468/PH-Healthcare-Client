import { createTheme } from '@mui/material/styles';

//https://mui.com/material-ui/customization/theming/
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1586FD",
    },
    secondary: {
      main: "#666f73",
    },
  },
  components:{
    MuiButton:{
        //https://mui.com/material-ui/react-container/
        defaultProps:{
            variant:"contained"
        },
        styleOverrides:{
            root:{
                padding:"8px 24px"
            }
        }
    },
    
    MuiContainer:{
        //https://mui.com/material-ui/react-container/
        defaultProps:{
            maxWidth:'lg'
        }
    }
  },
  typography:{
    body1:{
        color:"#0B1134CC"
    }
  }
});
theme.shadows[1]="0px 5px 22px lightgray"
