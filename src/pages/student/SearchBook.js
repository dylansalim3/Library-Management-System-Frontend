import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography'
import jwt_decode from 'jwt-decode';
import StudentBoilerplate from './StudentBoilerplate';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {OutlinedInput,InputLabel,Grid,MenuItem,Select,Button, ButtonGroup} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


class SearchBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCriteria:"Title"
        };
    }

    onChangeSearchCriteria = (event) =>{
        this.setState({
           searchCriteria:event.target.value,
        });
    }

    render() {
        const searchCriteria = this.state.searchCriteria;
        const onChangeSearchCriteria = this.onChangeSearchCriteria;
        return (
            <div><StudentBoilerplate/>
                <div className='content'>
                    <h2>Library Catalog</h2>
                    <Card style={{padding:10}}>
                        <CardContent style={{flexGrow:1}}>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={1}>
                                    <Grid item xs="8">
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel htmlFor="book-title">Book Title</InputLabel>
                                            <OutlinedInput id="book-title" name="book-title"
                                            label="Book Title"
                                            type="text"
                                            placeholder="Book Title Here"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <SearchIcon/>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth="60">
                                                
                                            </OutlinedInput>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs="4">                                        
                                        <FormControl style={{minWidth:120}} variant="outlined" fullWidth>                                            
                                            <Select
                                            name="search-criteria"
                                            value={searchCriteria}
                                            onChange={onChangeSearchCriteria}
                                            >
                                                <MenuItem value={"Title"}>Title</MenuItem>
                                                <MenuItem value={"ISBN"}>ISBN</MenuItem>
                                                <MenuItem value={"Publisher"}>Publisher</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>    
                                <h3>Genre</h3>
                                <Button variant="outlined">
                                    Fantasy
                                </Button>
                                <Button>Adventure</Button>
                                <Button>Thriller</Button>
                                <Button>Horror</Button>
                                <Button>Romance</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SearchBook;