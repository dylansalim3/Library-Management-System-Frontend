import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const CustomModal = (props) => {
    const {showAlertModal, onCloseConfirmationModal, onSuccessButtonPressed, title, desc, confirmationText} = props;


    return (
        <Dialog open={showAlertModal}
                onClose={onCloseConfirmationModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{desc}</DialogContent>
            <DialogActions>
                <Button onClick={onCloseConfirmationModal} color="warning">
                    Close
                </Button>
                <Button onClick={onSuccessButtonPressed} color="primary">
                    {confirmationText ? confirmationText : 'Ok'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CustomModal.propTypes = {
    showAlertModal: PropTypes.bool.isRequired,
    onSuccessButtonPressed: PropTypes.func.isRequired,
    onCloseConfirmationModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.any.isRequired,
    confirmationText: PropTypes.string,
};

export default CustomModal;