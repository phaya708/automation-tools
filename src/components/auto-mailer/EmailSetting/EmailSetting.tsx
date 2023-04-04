import { EmailConfigType } from "@/types/types";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

type EmailSettingProps = {
  mailConfig: EmailConfigType
  setMailConfig: React.Dispatch<EmailConfigType>
};

const EmailSetting = (props: EmailSettingProps) => {
  const { mailConfig, setMailConfig } = props;

  const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailConfig({ ...mailConfig, host: e.target.value });
  };

  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailConfig({ ...mailConfig, port: Number(e.target.value) });
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailConfig({ ...mailConfig, user: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailConfig({ ...mailConfig, email: e.target.value });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailConfig({ ...mailConfig, password: e.target.value });
  };
  

  return (
    <>
      <FormControl m={4}>
        <FormLabel>ホスト</FormLabel>
        <Input onChange={handleHostChange} />
        <FormHelperText>outlookの場合：smtp.office365.com</FormHelperText>
      </FormControl>
      <FormControl m={4}>
        <FormLabel>ポート番号</FormLabel>
        <Input value={mailConfig.port} onChange={handlePortChange} />
      </FormControl>
      <FormControl m={4}>
        <FormLabel>ユーザ名</FormLabel>
        <Input onChange={handleUserChange} />
        <FormHelperText>例：username@nuc.kwansei.ac.jp</FormHelperText>
      </FormControl>
      <FormControl m={4}>
        <FormLabel>メールアドレス</FormLabel>
        <Input onChange={handleEmailChange} />
        <FormHelperText>例：username@kwansei.ac.jp</FormHelperText>
      </FormControl>
      <FormControl m={4}>
        <FormLabel>パスワード</FormLabel>
        <Input type="password" onChange={handlePasswordChange} />
        <FormHelperText>メールアカウントのログインパスワード</FormHelperText>
      </FormControl>
    </>
  );
};

export default EmailSetting;
