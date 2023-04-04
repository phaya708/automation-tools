import { Modal } from "@/components/ui";
import { EmailConfigType, ModalType } from "@/types/types";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

type EmailSettingProps = {
  config: EmailConfigType;
};

const EmailSetting = (props: EmailSettingProps) => {
  const { config } = props;

  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [message, setMessage] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [alert, setAlert] = useState<"success" | "error" | null>(null);
  const [modal, setModal] = useState<ModalType>({
    title: "",
    body: "",
    isOpen: false,
  });

  const replaceMessage = (message: string, data: string[]) => {
    return message
      .replace("{{id}}", data[0])
      .replace("{{name}}", data[1])
      .replace("{{password}}", data[3]);
  };

  const handleClick = async () => {
    if (!csvData) {
      return;
    }

    const modifiedMessage = replaceMessage(message, csvData[0]);

    setModal({
      title: "確認",
      body: `以下の内容でメールを送信しますか？\n\n${modifiedMessage}`,
      isOpen: true,
    });
  };

  const handleClickConfirm = async () => {
    if (!csvData) {
      return;
    }

    setModal({ ...modal, isOpen: false });

    await axios
      .post("/api/email/send", {
        csvData: csvData,
        message: message,
        subject: subject,
        config: config,
      })
      .then((res) => {
        console.log(res);
        setAlert("success");
      })
      .catch((err) => {
        console.log(err);
        setAlert("error");
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      const text = reader.result as string;
      const csvData = text
        .split("\n") // 改行で区切る
        .map((row) => {
          const splitRow = row.split(",");
          return splitRow;
        });
      setCsvData(csvData);
    };
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  return (
    <>
      <Modal
        modal={modal}
        onClose={() => {
          setModal({ ...modal, isOpen: false });
        }}
        handleClick={handleClickConfirm}
      />
      {alert === "error" && (
        <Alert status="error">
          <AlertIcon />
          メールの送信に失敗しました。
        </Alert>
      )}
      {alert === "success" && (
        <Alert status="success">
          <AlertIcon />
          メールの送信に成功しました。
        </Alert>
      )}
      <FormControl m={4}>
        <FormLabel>CSVファイル</FormLabel>
        <Input type="file" accept=".csv" onChange={handleFileChange} />
        <FormHelperText>
          パスワードを生成したいCSVファイルを選択してください
        </FormHelperText>
      </FormControl>

      {csvData && (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>学生番号</Th>
                <Th>名前</Th>
                <Th>メールアドレス</Th>
                <Th>パスワード</Th>
              </Tr>
            </Thead>
            <Tbody>
              {csvData?.map((row, i) => {
                return (
                  <Tr key={i}>
                    {row.map((col, i) => {
                      return <Td key={i}>{col}</Td>;
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <FormControl m={4}>
        <FormControl my={3}>
          <FormLabel>件名</FormLabel>
          <Input onChange={handleSubjectChange} />
        </FormControl>

        <Flex>
          <FormControl>
            <FormLabel>本文</FormLabel>
            <Textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="送信内容を入力してください。"
              rows={17}
            />
          </FormControl>
          <FormControl>
            <FormLabel>プレビュー</FormLabel>
            <Textarea
              value={csvData ? replaceMessage(message, csvData[0]) : message}
              isReadOnly
              placeholder="プレビュー"
              rows={17}
            />
          </FormControl>
        </Flex>
        <FormHelperText whiteSpace="pre-wrap">
          {
            " {{変数名}} と入力するとCSVのデータが挿入されます。\n変数一覧: 「 {{password}}: パスワード,   {{id}}: 学生番号,    {{name}}: 名前 」"
          }
        </FormHelperText>
      </FormControl>

      <Button
        colorScheme="blue"
        isActive={csvData == null}
        onClick={handleClick}
      >
        メール送信
      </Button>
    </>
  );
};

export default EmailSetting;
