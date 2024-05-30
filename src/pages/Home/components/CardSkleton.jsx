import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSkleton = () => {
  return (
    <div className="card">
      <Skeleton className="img" />
      <Skeleton
        className="title"
        style={{ marginBottom: "4px", height: "15px" }}
      />
      <Skeleton style={{ marginBottom: "14px", width: "50%" }} />
      <div>
        <Skeleton
          className="price"
          style={{
            marginBottom: "4px",
            height: "15px",
            width: "80px",
            marginTop: "10px",
          }}
        />
        <Skeleton className="add-btn" />
      </div>
    </div>
  );
};
