import { Supply } from "@data/supply/Supply";
import { data, sup } from "framer-motion/client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DataContextProps {
  supplyData: Supply[];
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [supplyData, setSupplyData] = useState<Supply[]>([]);
  const datasetRef = useRef<Supply[] | null>(null);

  useEffect(() => {
    const loadDataset = async () => {
      try {
        if (!datasetRef.current) {
          const dataset = (await import("./supply.json")).default as Supply[];
          datasetRef.current = dataset;
        }
        setSupplyData(datasetRef.current || []);
        console.log(datasetRef.current);
      } catch (error) {
        console.error("Failed to load dataset:", error);
      }
    };
    loadDataset();
  }, []);

  return (
    <DataContext.Provider value={{ supplyData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSupply = (filter?: (supply: Supply) => boolean) => {
  const [loading, setLoading] = useState(true);
  const { supplyData } = useContext(DataContext);
  const [data, setData] = useState<Supply[]>([]);

  useEffect(() => {
    setLoading(true);
    if (!supplyData) {
      return;
    }
    setData(supplyData.filter((d: Supply) => (filter ? filter(d) : true)));
  }, [filter, supplyData]);

  useEffect(() => {
    if (data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  return { data, loading };
};
