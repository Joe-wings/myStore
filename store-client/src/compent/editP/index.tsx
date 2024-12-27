import { useState } from 'react';
import { Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditPage from '../edit';
const EditP: React.FC <{id: number}>= ({id}) => {
  const [open, setOpen] = useState(false);
  return (
    <span>
      <EditOutlined onClick={() => setOpen(true)}/>
      <Modal
        height={700}
        title="编辑商品"
        open={open}
        cancelText="Cancel"
       footer={null}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <EditPage id={id}/>
      </Modal>
    </span>
  );
};

export default EditP;