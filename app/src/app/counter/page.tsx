"use client";

import styles from './page.module.css';

import type { RootState } from "@/app-redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "@/app-redux/slices/counterSlice";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className={styles.button}
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <span>{count}</span>
      <button
        className={styles.button}
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button
        className={styles.button}
        onClick={() => dispatch(incrementByAmount(5))}
      >
        +5
      </button>
    </div>
  );
}