import React, { useState, useEffect } from "react";

const getMessageCountText = (count: number): string => {
    if (count % 10 === 1 && count % 100 !== 11) return "сообщение";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "сообщения";
    return "сообщений";
};

const formatDate = (): string => {
    const now = new Date();
    return now.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

const UnreadMessages: React.FC = () => {
    const [messageCount, setMessageCount] = useState<number | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        setMessageCount(Math.floor(Math.random() * 10) + 1);
        setFormattedDate(formatDate());
    }, []);

    if (messageCount === null) return null;

    return (
        <div>
        У вас { messageCount } { getMessageCountText(messageCount) } (последнее: { formattedDate })
    </div>
  );
};

export default UnreadMessages;
