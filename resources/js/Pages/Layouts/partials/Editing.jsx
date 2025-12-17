import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function Editing({ config, setConig }) {
    // config

    return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4 text-[#0a1128]">
                Customize
            </h1>
            {/* side bar */}
            <div className="flex flex-col mt-8 border-b-2 pb-4 border-gray-300">
                <h2 className="text-lg font-semibold mb-2 text-[#0a1128]">
                    Sidebar Color
                </h2>
                <div>
                    <input
                        value={config.sidebar_color}
                        onChange={(e) =>
                            setConig({
                                ...config,
                                sidebar_color: e.target.value,
                            })
                        }
                        className={`p-2 border-1  cursor-pointer bg-transparent mb-2 rounded w-3/4 `}
                        style={{ borderColor: config.sidebar_color }}
                    />
                    <HexColorPicker
                        color={config.sidebar_color}
                        onChange={(color) =>
                            setConig({ ...config, sidebar_color: color })
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col mt-8 border-b-2 pb-4 border-gray-300">
                <h2 className="text-lg font-semibold mb-2 text-[#0a1128]">
                    Font Primary Color
                </h2>
                <div>
                    <input
                        value={config.font_primary_color}
                        onChange={(e) =>
                            setConig({
                                ...config,
                                font_primary_color: e.target.value,
                            })
                        }
                        className={`p-2 border-1  cursor-pointer bg-transparent mb-2 rounded w-3/4 `}
                        style={{ borderColor: config.font_primary_color }}
                    />
                    <HexColorPicker
                        color={config.sidebar_color}
                        onChange={(color) =>
                            setConig({ ...config, font_primary_color: color })
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col mt-8 border-b-2 pb-4 border-gray-300">
                <h2 className="text-lg font-semibold mb-2 text-[#0a1128]">
                    Font Secondary Color
                </h2>
                <div>
                    <input
                        value={config.font_secondary_color}
                        onChange={(e) =>
                            setConig({
                                ...config,
                                font_secondary_color: e.target.value,
                            })
                        }
                        className={`p-2 border-1  cursor-pointer bg-transparent mb-2 rounded w-3/4 `}
                        style={{ borderColor: config.font_secondary_color }}
                    />
                    <HexColorPicker
                        color={config.sidebar_color}
                        onChange={(color) =>
                            setConig({ ...config, font_secondary_color: color })
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col mt-8 border-b-2 pb-4 border-gray-300">
                <h2 className="text-lg font-semibold mb-2 text-[#0a1128]">
                    Font Family
                </h2>
                <div>
                    <select
                        value={config.font_family}
                        onChange={(e) =>
                            setConig({ ...config, font_family: e.target.value })
                        }
                        className="border rounded p-2"
                    >
                        <option value="Arial, sans-serif">Arial</option>

                        <option value="Inter, sans-serif">Inter</option>

                        <option value="Roboto, sans-serif">Roboto</option>

                        <option value="'Open Sans', sans-serif">
                            Open Sans
                        </option>

                        <option value="'Indie Flower', cursive">
                            Indie Flower
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}
