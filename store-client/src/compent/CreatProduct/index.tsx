import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EditPage from '../edit';
const Create: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position: 'absolute', left:215,top:75}}>
      <Button type="primary" onClick={() => setOpen(true)}>
        添加商品
      </Button>
      <Modal
        height={700}
        title="添加商品"
        open={open}
        cancelText="Cancel"
       footer={null}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <EditPage/>
      </Modal>
    </div>
  );
};

export default Create;