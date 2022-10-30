import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

export default function RedirectDialog(props) {
    const { open, onClose, onConfirm } = props;

    const handleConfirm = async () => {
        await onConfirm();
        onClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    참여가 완료되었습니다!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        회차별 우승자 내역을 구경해 보시겠어요?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>아니오</Button>
                    <Button color="error" onClick={handleConfirm} autoFocus>
                        좋습니다
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}