import { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function AlertDialog(props) {
    const { open, onClose, onConfirm } = props;
    const inputRef = useRef();
    const handleConfirm = async () => {
        console.log(inputRef.current?.value);
        await onConfirm();
        onClose();
    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    참가하시겠습니까?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        0.05 ETH를 스마트 컨트랙트로 전송합니다.
                    </DialogContentText>
                    <DialogContentText gutterBottom variant="body2" id="alert-dialog-description">
                        (optional) 본인만 알 수 있는 닉네임을 입력해 주세요.
                    </DialogContentText>
                    <TextField
                        inputRef={inputRef}
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="nickname"
                        type="text"
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>취소</Button>
                    <Button color="error" onClick={handleConfirm} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}