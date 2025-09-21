export type MessageRequest = {
  body: {
    userId: string;
    content: string;
    emailTo: string;
  };

  params: {
    type: string;
  };
};
