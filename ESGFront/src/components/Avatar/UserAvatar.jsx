import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import api from '../../api';

export default function UserAvatar() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    api.get("user/profile/")
      .then(res => {
        console.log("PROFILE:", res.data)
        if (res.data.avatar) {
          setAvatarUrl(`${res.data.avatar}`);
        }
      })
      .catch(err => console.error("Ошибка загрузки аватара", err));
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="User Avatar"
        src={avatarUrl}
        sx={{
          width: 40,
          height: 40,
        }}
      />
    </Stack>
  );
}
