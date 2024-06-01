import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, TextInput, Button, DataTable, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { mountUserData, searchUser, setError, sortData } from "../../redux/actions/index";
import { CustomText } from "../../components/CustomText";
import ScrollViewComponent from "../../components/ScrollViewComponent";
import CustomTextInput from "../../components/CustomInput";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { colors } from "../../theme/colors/index";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = homeScreenStyle();

  const [searchedUser, setSearchedUser] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const { filteredUsers, searchedUserId, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(mountUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchUser({ keyword: searchedUser, hideError: true }));
  }, [searchedUser]);

  const handleSearch = () => {
    dispatch(searchUser({ keyword: searchedUser }));
  };

  const toggleSortDirection = () => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));

  const sortByField = (field) => {
    dispatch(sortData({ direction: sortDirection, field }));
    toggleSortDirection();
  };

  const onDismissSnackBar = () => dispatch(setError({ error: "" }));

  const isTopUser = useMemo(() => filteredUsers.length > 0, [filteredUsers]);

  const renderTableItem = useCallback(
    ({ item }) => (
      <DataTable.Row key={item.uid} style={item.uid === searchedUserId && styles.highlightedRow}>
        <DataTable.Cell>{item.rank}</DataTable.Cell>
        <DataTable.Cell>{item.name}</DataTable.Cell>
        <DataTable.Cell numeric>{item.bananas}</DataTable.Cell>
      </DataTable.Row>
    ),
    [searchedUserId]
  );

  return (
    <>
      <ScrollViewComponent
        headerTitle="Home"
        rightComponent={
          isTopUser && (
            <Menu style={styles.popMenuContainer}>
              <MenuTrigger>
                <View style={styles.row}>
                  <CustomText style={styles.sortByText}>Sort by</CustomText>
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptions}>
                <MenuOption onSelect={() => sortByField("bananas")}>
                  <CustomText style={styles.sortByText}>Lowest rank</CustomText>
                </MenuOption>
                <MenuOption onSelect={() => sortByField("name")}>
                  <CustomText>Name</CustomText>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )
        }
      >
        <View style={styles.inputContainer}>
          <CustomTextInput
            returnKeyLabel="Search"
            left={
              <TextInput.Icon icon="magnify" color={theme.colors.secondary} size={18} onPress={handleSearch} />
            }
            value={searchedUser}
            onChangeText={setSearchedUser}
            placeholder="Enter username"
            placeholderTextColor="grey"
          />
          <Button onPress={handleSearch}>Search</Button>
        </View>
        {isTopUser ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Rank</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title numeric>Bananas</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={filteredUsers}
              style={styles.flatListStyle}
              renderItem={renderTableItem}
              showsVerticalScrollIndicator={false}
            />
          </DataTable>
        ) : (
          <View style={styles.emptyContainer}>
            <CustomText>No Data Found</CustomText>
          </View>
        )}
      </ScrollViewComponent>
      <Snackbar
        visible={!!error}
        style={{ backgroundColor: 'red' }}
        onDismiss={onDismissSnackBar}
        duration={5000}
        action={{
          labelStyle: { color: colors.white },
          label: 'Hide',
        }}
      >
        <CustomText type="default" style={styles.snackBarText}>
          {error}
        </CustomText>
      </Snackbar>
    </>
  );
};

export default HomeScreen;

const homeScreenStyle = () =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 15,
    },
    highlightedRow: {
      backgroundColor: colors.info,
    },
    snackBarText: {
      color: colors.white,
    },
    popMenuContainer: {
      marginRight: 20,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuOptions: {
      marginTop: 25,
      borderRadius: 5,
      paddingHorizontal: 10,
      width: 130,
      backgroundColor: colors.white,
    },
    sortByText: {
      paddingRight: 5,
      color: colors.textColor,
    },
    emptyContainer: {
      height: "90%",
      justifyContent: "center",
      alignItems: "center",
    },
    flatListStyle: { marginBottom: 250 },
  });
