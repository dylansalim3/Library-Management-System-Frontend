import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import {Tab,Box,Typography} from '@material-ui/core';
import '../../../style/Style.css';
import AdminBoilerplate from "../AdminBoilerplate";
import BorrowBookTab from "./BorrowBookTab";
import ReturnBookTab from "./ReturnBookTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography component="span">{children}</Typography>
            </Box>
        )}
      </div>
  );
}

export default class Borrowbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tab:0
        }
    }

    onChangeTabs = (e,value) =>{
      console.log(e);
      console.log(value);
      this.setState({tab:value});
    };




    render() {
        return (
            <div>
                <AdminBoilerplate page={"borrowbook"}/>
                <div className="content">
                  <Paper>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.onChangeTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                      <Tab label="Borrow" id={'simple-tab-'+0} aria-controls={`simple-tabpanel-${0}`}/>
                      <Tab label="Return" id={'simple-tab-'+1} aria-controls={`simple-tabpanel-${1}`}/>
                      <Tab label="Renew" id={'simple-tab-'+2} aria-controls={`simple-tabpanel-${2}`}/>

                    </Tabs>
                    <TabPanel value={this.state.tab} index={0}>
                      <BorrowBookTab/>
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={1}>
                      <ReturnBookTab/>
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={2}>
                      Book Renew
                    </TabPanel>
                  </Paper>
                </div>
            </div>
        );
    }
}
