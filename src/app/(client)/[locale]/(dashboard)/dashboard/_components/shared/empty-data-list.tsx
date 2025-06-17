import { Package } from "lucide-react";
import React from "react";

const EmptyDataList: React.FC<{ name: "article" | "gadget" }> = ({ name }) => {
  return (
    <div className="  py-12 px-4 text-center">
      <div className="rounded-full bg-muted/30 p-6 mb-4 flex justify-center">
        <Package className="h-12 w-12 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-medium text-muted-foreground mb-2">
        No {name}s found
      </h3>
      <p className="text-sm text-muted-foreground/70 text-center  ">
        There are no {name}s to display at the moment. Try adjusting your
        filters or create a new {name}
      </p>
    </div>
  );
};

export default EmptyDataList;
