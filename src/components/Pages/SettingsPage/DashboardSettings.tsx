"use client";

import { useEffect, useState } from "react";

import SidebarMenu from "./SettingsSidebar";
import SettingsMenu from "./SettingsMenu";

import VataInformation from "./VataInformation";
import ChangeClassAndRate from "./ChangeClassAndRate";
import Khotiyan from "./Khotiyan";
import SoftwareUser from "./SoftwareUser";
import PasswordChange from "./PasswordChange";
import UserLimit from "./UserLimit";

import { useTitleStore } from "@/zustand/store/titleStore";
import { TQuery } from "@/interface/query";

const DashboardSettings = ({
    limit,
    page: pagination,
    search,
}: TQuery) => {
    const [page, setPage] = useState<number>(1);

    const { setTitle } = useTitleStore();

    useEffect(() => {
        setTitle("সেটিংস");
    }, [setTitle]);

    const renderContent = () => {
        switch (page) {
            case 1:
                return <VataInformation />;

            case 2:
                return <ChangeClassAndRate />;

            case 3:
                return (
                    <Khotiyan
                        page={pagination}
                        search={search}
                        limit={limit}
                    />
                );

            case 4:
                return <SoftwareUser />;

            case 5:
                return <PasswordChange />;

            case 6:
                return <UserLimit />;

            case 7:
                return (
                    <div className="rounded-lg border border-gray-200 bg-white p-5">
                        ইউজার অ্যাক্সেস
                    </div>
                );

            default:
                return <VataInformation />;
        }
    };

    return (
        <div className="min-h-[90vh] w-full rounded-md bg-white p-2 sm:p-3">

            {/* =========================================
                LARGE DEVICE
                ========================================= */}
            <div className="hidden md:block">
                <div
                    className="
                        flex
                        flex-row
                        items-start
                        gap-5
                    "
                >
                    {/* Sidebar */}
                    <SidebarMenu setPage={setPage} />

                    {/* Content */}
                    <main
                        className="
                            min-w-0
                            flex-1
                            overflow-hidden
                            rounded-md
                            bg-white
                        "
                    >
                        {renderContent()}
                    </main>
                </div>
            </div>


            {/* =========================================
                SMALL DEVICE
                ========================================= */}
            <div className="block md:hidden">
                <SettingsMenu  />
            </div>

        </div>
    );
};

export default DashboardSettings;