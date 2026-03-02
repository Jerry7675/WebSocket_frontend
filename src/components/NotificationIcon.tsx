import React from "react";

interface NotificationIconProps {
  unreadCount: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ unreadCount }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C10.343 2 9 3.343 9 5V6.068C6.165 7.165 4 9.97 4 13V18L2 20V21H22V20L20 18V13C20 9.97 17.835 7.165 15 6.068V5C15 3.343 13.657 2 12 2Z"
          stroke="#333"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            minWidth: "20px",
            textAlign: "center",
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
