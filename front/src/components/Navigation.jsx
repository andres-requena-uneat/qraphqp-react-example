import React from "react";
import "../styles/navigation.scss"
import { 
    Button,
    InlineDrawer,
    DrawerHeader,
    DrawerHeaderTitle,
    DrawerBody
} from "@fluentui/react-components";
import { 
    Home24Regular,
    BookRegular,
    PersonNoteRegular
} from "@fluentui/react-icons";
import { NavLink, Outlet } from "react-router-dom";

const Navigation = (props) => {

    return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100vh"
          }}
        >
            <InlineDrawer
                separator
                open
            >
                <DrawerHeader>
                <DrawerHeaderTitle>Books & Authors</DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <div>
                        <NavLink to="/">
                            <Button
                                icon={<Home24Regular />}
                                size="large"
                                className="navigationButton"
                                >
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to="/authors">
                            <Button
                                icon={<PersonNoteRegular />}
                                size="large"
                                className="navigationButton"
                            >
                                Authors
                            </Button>
                        </NavLink>
                        <NavLink to="/books">
                            <Button
                                icon={<BookRegular />}
                                size="large"
                                className="navigationButton"
                            >
                                Books
                            </Button>
                        </NavLink>
                    </div>
                </DrawerBody>
            </InlineDrawer>
            <div
                style={{
                width: "100%",
                padding: "32px"
                }}
            >
                <Outlet />
            </div>
        </div>
    )

}

export default Navigation